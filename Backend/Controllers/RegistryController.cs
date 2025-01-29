using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistryController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Registry(User user)
        {
            using(var context = new AdatbazisContext())
            {
                try
                {
                    if(context.Users.FirstOrDefault(f => f.FelhasznaloNev == user.FelhasznaloNev) != null)
                    {
                        return BadRequest("A felhasználónév már foglalt!");
                    }
                    if (context.Users.FirstOrDefault(f => f.Email == user.Email) != null)
                    {
                        return BadRequest("Ezzel az email címmel már regisztráltak!");
                    }
                    user.Jogosultsag = 0;
                    user.Aktiv = 0;
                    user.Hash = Program.CreateSHA256(user.Hash);
                    await context.Users.AddAsync(user);
                    await context.SaveChangesAsync();

                    Program.SendEmail(user.Email,"Regisztráció", $"https://localhost:7040/api/Registry?felhasznaloNev={user.FelhasznaloNev}&email={user.Email}");
                    return Ok("Sikeres regisztráció. Ellenőrízze az emailjeit és véglegesítse a regisztrációt!");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet]
        public async Task<IActionResult> EndOfRegistry(string felhasznaloNev, string email)
        {
            using(var context = new AdatbazisContext())
            {
                try
                {
                    User user = await context.Users.FirstOrDefaultAsync(f => f.FelhasznaloNev == felhasznaloNev && f.Email == email);
                    if(user == null) { return BadRequest("Sikertelen a regisztráció befejezése."); }
                    user.Aktiv = 1;
                    context.Users.Update(user);
                    await context.SaveChangesAsync();
                    return Ok("A regisztráció sikeresen befejeződött.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
