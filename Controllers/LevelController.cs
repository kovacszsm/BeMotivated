using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly AdatbazisContext _context;

        public LevelController(AdatbazisContext context)
        {
            _context = context;
        }

        // XP frissítése token alapján
        [HttpPut("update-xp/{token}")]
        public async Task<IActionResult> UpdateXp(string token, [FromBody] int xpAmount)
        {
            if (!Program.LoggedInUsers.ContainsKey(token))
                return Unauthorized("Érvénytelen token!");

            var user = Program.LoggedInUsers[token];

            user.Xp += xpAmount; // XP növelése
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "XP frissítve!", newXp = user.Xp });
        }

        // Streak frissítése token alapján
        [HttpPut("update-streak/{token}")]
        public async Task<IActionResult> UpdateStreak(string token, [FromBody] int streakCount)
        {
            if (!Program.LoggedInUsers.ContainsKey(token))
                return Unauthorized("Érvénytelen token!");

            var user = Program.LoggedInUsers[token];

            user.Streak = streakCount; // Streak beállítása
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Streak frissítve!", newStreak = user.Streak });
        }

        // Felhasználó XP és Streak értékének lekérdezése token alapján
        [HttpGet("get/{token}")]
        public async Task<IActionResult> GetUserLevel(string token)
        {
            if (!Program.LoggedInUsers.ContainsKey(token))
                return Unauthorized("Érvénytelen token!");

            var user = Program.LoggedInUsers[token];

            return Ok(new { xp = user.Xp, streak = user.Streak });
        }
    }
}