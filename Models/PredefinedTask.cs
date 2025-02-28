using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class PredefinedTask
{
    public int Id { get; set; }

    public int? CategoryId { get; set; }

    public string Text { get; set; } = null!;

    public string? Icon { get; set; }

    [JsonIgnore]
    public virtual CategoryType? Category { get; set; }
}
