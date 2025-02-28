using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class UserTask
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int CategoryId { get; set; }

    public string StartTime { get; set; } = null!;

    public string EndTime { get; set; } = null!;

    public DateTime TaskDate { get; set; }

    public bool Completed { get; set; }

    [JsonIgnore]
    public virtual User User { get; set; } = null!;
}
