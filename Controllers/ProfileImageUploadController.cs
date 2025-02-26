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




        [HttpPost]
        public async Task<IActionResult> FileUploadFtp()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subfolder = "/";
                var filePath = "ftp://ftp.nethely.hu" + subfolder + fileName;
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(filePath);
                request.Credentials = new NetworkCredential("kovacszs", "IOlka3491oVCx");
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (var ftpStream = request.GetRequestStream())
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
