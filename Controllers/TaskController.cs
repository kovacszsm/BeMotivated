using Backend;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TaskController : ControllerBase
{
    private readonly AdatbazisContext _context;

    public TaskController(AdatbazisContext context)
    {
        _context = context;
    }

    // **GET /Tasks/{token}** → Felhasználó összes feladata
    [HttpGet("GetTasks/{token}")]
    public async Task<ActionResult<IEnumerable<Tasks>>> GetUserTasks(string token)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var tasks = await _context.Tasks.Where(t => t.UserId == user.Id).ToListAsync();

        return Ok(tasks);
    }

    // **POST /Tasks/{token}** → Új feladat hozzáadása
    [HttpPost("PostTask/{token}")]
    public async Task<ActionResult<Tasks>> AddTask(string token, [FromBody] Tasks newTask)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        if (newTask == null)
            return BadRequest("A feladat nem lehet üres!");

        var user = Program.LoggedInUsers[token];
        newTask.UserId = user.Id;

        _context.Tasks.Add(newTask);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserTasks), new { token = token }, newTask);
    }


    // **PUT /Tasks/{token}/{taskId}** → Feladat módosítása
    [HttpPut("PutTask/{token}/{taskId}")]
    public async Task<IActionResult> UpdateTask(string token, int taskId, [FromBody] Tasks updatedTask)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var existingTask = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == user.Id);

        if (existingTask == null)
            return NotFound("Feladat nem található!");

        existingTask.CategoryId = updatedTask.CategoryId;
        existingTask.StartTime = updatedTask.StartTime;
        existingTask.EndTime = updatedTask.EndTime;
        existingTask.TaskDate = updatedTask.TaskDate;
        existingTask.Completed = updatedTask.Completed;

        await _context.SaveChangesAsync();
        return Ok(existingTask);
    }

    // **DELETE /Tasks/{token}/{taskId}** → Feladat törlése
    [HttpDelete("DeleteTask/{token}/{taskId}")]
    public async Task<IActionResult> DeleteTask(string token, int taskId)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == user.Id);

        if (task == null)
            return NotFound("Feladat nem található!");

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok("Feladat törölve!");
    }
}
