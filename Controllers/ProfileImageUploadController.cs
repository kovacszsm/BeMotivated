using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileImageUploadController : ControllerBase
    {
        IWebHostEnvironment _env;
        private readonly AdatbazisContext _context;

        public ProfileImageUploadController(IWebHostEnvironment env, AdatbazisContext context)
        {
            _env = env;
            _context = context;
        }

        [HttpPost("FileUploadFtp/{token}")]
        public async Task<IActionResult> FileUploadFtp(string token)
        {
            try
            {
                // Token ellenőrzése
                if (!Program.LoggedInUsers.ContainsKey(token))
                    return Unauthorized("Érvénytelen token!");

                var user = Program.LoggedInUsers[token];
                string userName = user.FelhasznaloNev; // Feltételezzük, hogy ez a tulajdonság tartalmazza a felhasználó nevét.

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                // Az eredeti fájlnév helyett a felhasználónevet használjuk, megtartva az eredeti kiterjesztést
                // Itt mindig .jpg-re alakítjuk át a fájlt
                string fileName = $"{userName}.jpg";

                // A fájl az FTP szerveren a gyökérből kerül mentésre
                var filePath = "ftp://ftp.nethely.hu/" + fileName;

                // Ellenőrizzük, hogy a fájl létezik-e, ha igen, töröljük
                FtpWebRequest checkRequest = (FtpWebRequest)WebRequest.Create(filePath);
                checkRequest.Credentials = new NetworkCredential("kovacszs", "IOlka3491oVCx");
                checkRequest.Method = WebRequestMethods.Ftp.GetDateTimestamp;
                try
                {
                    using (FtpWebResponse response = (FtpWebResponse)checkRequest.GetResponse())
                    {
                        // Fájl létezik: töröljük
                        FtpWebRequest deleteRequest = (FtpWebRequest)WebRequest.Create(filePath);
                        deleteRequest.Credentials = new NetworkCredential("kovacszs", "IOlka3491oVCx");
                        deleteRequest.Method = WebRequestMethods.Ftp.DeleteFile;
                        using (FtpWebResponse deleteResponse = (FtpWebResponse)deleteRequest.GetResponse())
                        {
                            // Törlés sikeres
                        }
                    }
                }
                catch (WebException)
                {
                    // Ha a fájl nem létezik, folytatjuk az upload-t.
                }

                // Fájl feltöltése
                FtpWebRequest uploadRequest = (FtpWebRequest)WebRequest.Create(filePath);
                uploadRequest.Credentials = new NetworkCredential("kovacszs", "IOlka3491oVCx");
                uploadRequest.Method = WebRequestMethods.Ftp.UploadFile;
                await using (var ftpStream = uploadRequest.GetRequestStream())
                {
                    postedFile.CopyTo(ftpStream);
                }

                // Adatbázis frissítése: a felhasználó Profilkep mezőjébe mentjük a feltöltött file nevét
                var dbUser = await _context.Users.FindAsync(user.Id);
                if (dbUser != null)
                {
                    dbUser.Profilkep = fileName;
                    await _context.SaveChangesAsync();
                }

                return Ok($"Sikeres feltöltés {fileName}!");
            }
            catch (Exception ex)
            {
                return Ok("default.jpg");
            }
        }
    }
}
