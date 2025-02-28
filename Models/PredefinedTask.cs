using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class PredefinedTask
{
    public int Id { get; set; }

    public string Category { get; set; } = null!;

    public string TaskText { get; set; } = null!;

    public string Icon { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}
