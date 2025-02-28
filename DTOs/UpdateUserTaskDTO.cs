public class UpdateUserTaskDTO
{
    public int CategoryId { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public DateTime TaskDate { get; set; }
    public bool Completed { get; set; }
}
