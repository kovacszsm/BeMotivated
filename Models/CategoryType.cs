using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class CategoryType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<PredefinedTask> PredefinedTasks { get; set; } = new List<PredefinedTask>();
}
