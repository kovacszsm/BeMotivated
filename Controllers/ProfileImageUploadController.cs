using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Ocsp;
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

        // FTP hitelesítő adatok
        //  var ftpUsername = "kovacszs";
        //var ftpUsername = "nemethb@kkszki.hu";
        //  var ftpPassword = "IOlka3491oVCx";
        // var ftpPassword = "Ab12345678!";

        [HttpPost("FileUploadFtp/{token}")]
        public async Task<IActionResult> FileUploadFtp(string token)
        {
            string userName = null; // Deklaráljuk a változót a try blokk előtt

            try
            {
                // Token ellenőrzése
                if (!Program.LoggedInUsers.ContainsKey(token))
                    return Unauthorized("Érvénytelen token!");

                var user = Program.LoggedInUsers[token];
                userName = user.FelhasznaloNev; // Inicializáljuk a változót

                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];

                // Fájl méretének ellenőrzése
                if (postedFile.Length > 5 * 1024 * 1024) // 5MB
                    return BadRequest("A fájl túl nagy. Maximum 5MB lehet.");

                // Fájl típusának ellenőrzése
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                string extension = Path.GetExtension(postedFile.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Csak képek feltöltése engedélyezett.");

                // Fájlnév és célmappa beállítása
                string fileName = $"{userName}{extension}"; // Felhasználónév + kiterjesztés
                string subfolder = "/images/"; // Az images könyvtárba töltjük fel
                var filePath = "ftp://ftp.nethely.hu" + subfolder + fileName;

                // FTP hitelesítő adatok
                var ftpUsername = "nemethb@kkszki.hu";
                var ftpPassword = "Ab12345678!";

                // Ellenőrizzük, hogy a fájl létezik-e, ha igen, töröljük
                FtpWebRequest checkRequest = (FtpWebRequest)WebRequest.Create(filePath);
                checkRequest.Credentials = new NetworkCredential(ftpUsername, ftpPassword);
                checkRequest.Method = WebRequestMethods.Ftp.GetDateTimestamp;
                try
                {
                    using (FtpWebResponse response = (FtpWebResponse)await checkRequest.GetResponseAsync())
                    {
                        // Fájl létezik: töröljük
                        FtpWebRequest deleteRequest = (FtpWebRequest)WebRequest.Create(filePath);
                        deleteRequest.Credentials = new NetworkCredential(ftpUsername, ftpPassword);
                        deleteRequest.Method = WebRequestMethods.Ftp.DeleteFile;
                        using (FtpWebResponse deleteResponse = (FtpWebResponse)await deleteRequest.GetResponseAsync())
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
                uploadRequest.Credentials = new NetworkCredential(ftpUsername, ftpPassword);
                uploadRequest.Method = WebRequestMethods.Ftp.UploadFile;
                uploadRequest.UsePassive = true; // Passzív mód bekapcsolása

                await using (var ftpStream = await uploadRequest.GetRequestStreamAsync())
                {
                    await postedFile.CopyToAsync(ftpStream);
                }

                // A feltöltött kép elérési útjának generálása
                string imageUrl = $"http://bemotivated3.nhely.hu/images/{fileName}";

                // Adatbázis frissítése
                using (var context = new Models.AdatbazisContext()) // Helyettesítsd a saját DbContext-eddel
                {
                    var dbUser = context.Users.FirstOrDefault(u => u.FelhasznaloNev == userName);
                    if (dbUser != null)
                    {
                        dbUser.Profilkep = imageUrl; // Profilkep mező frissítése
                        await context.SaveChangesAsync();
                    }
                }

                return Ok($"Sikeres feltöltés {fileName} az images könyvtárba! Profilkép frissítve.");
            }
            catch (Exception ex)
            {
                // Ha hiba történt, állítsuk be a default képet
                if (userName != null) // Ellenőrizzük, hogy a userName inicializálva van-e
                {
                    using (var context = new Models.AdatbazisContext()) // Helyettesítsd a saját DbContext-eddel
                    {
                        var dbUser = context.Users.FirstOrDefault(u => u.FelhasznaloNev == userName);
                        if (dbUser != null)
                        {
                            dbUser.Profilkep = "http://bemotivated3.nhely.hu/images/default.jpg"; // Default kép beállítása
                            await context.SaveChangesAsync();
                        }
                    }
                }

                return StatusCode(500, $"Hiba történt: {ex.Message}. Default kép beállítva.");
            }
        }
    }
}