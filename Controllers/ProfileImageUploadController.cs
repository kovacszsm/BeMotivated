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
        public ProfileImageUploadController(IWebHostEnvironment env)
        {
            _env = env;
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
                string extension = Path.GetExtension(postedFile.FileName);
                string fileName = $"{userName}{extension}";

                // A fájl a felhasználó saját mappájába kerül mentésre
                string subfolder = "/" + userName + "/";
                var filePath = "ftp://ftp.nethely.hu" + subfolder + fileName;

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
                return Ok($"Sikeres feltöltés {fileName}!");
            }
            catch (Exception ex)
            {
                return Ok("default.jpg");
            }
        }


    }
}
