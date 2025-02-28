using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredefinedTaskController : ControllerBase
    {
        [HttpGet]

        public async Task<IActionResult> GetPredefinedTasks()
        {
            using (var context = new AdatbazisContext())
            {
                try
                {
                    return Ok(await context.PredefinedTasks.ToListAsync());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [HttpGet("ById/{id}")]

        public async Task<IActionResult> GetPredefinedTasks(int id)
        {
            using (var context = new AdatbazisContext())
            {
                try
                {
                    return Ok(await context.PredefinedTasks.FirstOrDefaultAsync(f=>f.Id==id));
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
