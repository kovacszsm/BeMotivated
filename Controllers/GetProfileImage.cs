using Backend;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GetProfileImage : ControllerBase
{
    private readonly AdatbazisContext _context;

    public GetProfileImage(AdatbazisContext context)
    {
        _context = context;
    }

    [HttpGet("GetProfileImage/{token}")]
    public async Task<IActionResult> GetUserProfilePicture(string token)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var cachedUser = Program.LoggedInUsers[token];
        var user = await _context.Users.FindAsync(cachedUser.Id);
        if (user == null)
            return NotFound("A felhasználó nem található!");

        return Ok(new { profilkep = "http://images.vizsgaremekkzsm.nhely.hu/" + user.Profilkep });
    }

}
