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

    // **GET /UserTasks/{token}** → Felhasználó összes feladata
    [HttpGet("GetUserTasks/{token}")]
    public async Task<ActionResult<IEnumerable<UserTask>>> GetUserUserTasks(string token)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var UserTasks = await _context.UserTasks.Where(t => t.UserId == user.Id).ToListAsync();

        return Ok(UserTasks);
    }

    // **POST /UserTasks/{token}** → Új feladat hozzáadása
    [HttpPost("PostTask/{token}")]
    public async Task<ActionResult<UserTask>> AddTask(string token, [FromBody] UserTask newTask)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        if (newTask == null)
            return BadRequest("A feladat nem lehet üres!");

        var user = Program.LoggedInUsers[token];
        newTask.UserId = user.Id;

        _context.UserTasks.Add(newTask);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserUserTasks), new { token = token }, newTask);
    }


    // **PUT /UserTasks/{token}/{taskId}** → Feladat módosítása
    [HttpPut("PutTask/{token}/{taskId}")]
    public async Task<IActionResult> UpdateTask(string token, int taskId, [FromBody] UserTask updatedTask)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var existingTask = await _context.UserTasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == user.Id);

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

    // **DELETE /UserTasks/{token}/{taskId}** → Feladat törlése
    [HttpDelete("DeleteTask/{token}/{taskId}")]
    public async Task<IActionResult> DeleteTask(string token, int taskId)
    {
        if (!Program.LoggedInUsers.ContainsKey(token))
            return Unauthorized("Érvénytelen token!");

        var user = Program.LoggedInUsers[token];
        var task = await _context.UserTasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == user.Id);

        if (task == null)
            return NotFound("Feladat nem található!");

        _context.UserTasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok("Feladat törölve!");
    }
}
