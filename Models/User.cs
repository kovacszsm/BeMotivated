using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend.Models;

public partial class User
{
    public int Id { get; set; }

    public string FelhasznaloNev { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public string Hash { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int Jogosultsag { get; set; }

    public int Aktiv { get; set; }

    public DateTime RegisztracioDatuma { get; set; }

    public int Streak { get; set; }

    public int Xp { get; set; }

    public string Profilkep { get; set; } = null!;

    [JsonIgnore]    
    public virtual ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}
