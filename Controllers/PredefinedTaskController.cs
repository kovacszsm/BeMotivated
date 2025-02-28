using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models; // itt a modellek elérési útja
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredefinedTaskController : ControllerBase
    {
        private readonly AdatbazisContext _context;

        public PredefinedTaskController(AdatbazisContext context)
        {
            _context = context;
        }

        // GET: api/PredefinedTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PredefinedTaskDTO>>> GetPredefinedTasks()
        {
            var tasks = await _context.PredefinedTasks
                .Include(pt => pt.Category)
                .ToListAsync();

            var result = tasks.Select(pt => new PredefinedTaskDTO
            {
                Id = pt.Id,
                Category = pt.Category?.Name,
                TaskText = pt.Text,
                Icon = pt.Icon
            }).ToList();

            return Ok(result);
        }
    }
}
