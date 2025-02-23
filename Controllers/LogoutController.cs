using Backend;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogoutController : ControllerBase
    {
        [HttpPost("Logout/{token}")]
        public IActionResult Logout(string token)
        {
            if(Program.LoggedInUsers.ContainsKey(token))
            {
                Program.LoggedInUsers.Remove(token);
                return Ok("Sikeres kijelentkezés!");
            }
            else
            {
                return NotFound("Nem található felhasználó ezzel a tokennel!");
            }
        }
    }
}
