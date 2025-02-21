namespace Backend.Models;

public partial class Tasks
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int CategoryId { get; set; }

    public string StartTime { get; set; }

    public string EndTime { get; set; }

    public DateTime TaskDate { get; set; }

    public bool Completed { get; set; }
}
