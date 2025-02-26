using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DTOs;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        [HttpPost("GetSalt/{felhasznaloNev}")]
        public async Task<IActionResult> GetSalt(string felhasznaloNev)
        {
            using (var context = new AdatbazisContext())
            {
                try
                {
                    User response = await context.Users.FirstOrDefaultAsync(u => u.FelhasznaloNev == felhasznaloNev);
                    if(response == null)
                    {
                        return NotFound("Nem található ez a felhasználónév!");
                    }
                    else
                    {
                        return Ok(response.Salt);
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            using (var context = new AdatbazisContext())
            {
                try
                {
                    string Hash = Program.CreateSHA256(loginDTO.TmpHash);
                    User loggedUser = await context.Users.FirstOrDefaultAsync(u => u.FelhasznaloNev == loginDTO.LoginName && u.Hash == Hash);
                    if(loggedUser != null && loggedUser.Aktiv == 1)
                    {
                        string token = Guid.NewGuid().ToString();
                        lock (Program.LoggedInUsers)
                        {
                            Program.LoggedInUsers.Add(token, loggedUser);
                        }
                        return Ok(new LoggedUser
                        {
                            FelhasznaloNev = loginDTO.LoginName,
                            Email = loggedUser.Email,
                            Jogosultsag = loggedUser.Jogosultsag,
                            Token = token,
                            Xp = loggedUser.Xp,
                            Streak = loggedUser.Streak
                        });
                    }
                    else
                    {
                        return NotFound("Hibás felhasználónév vagy jelszó!");
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
