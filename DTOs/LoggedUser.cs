namespace Backend.DTOs
{
    public class LoggedUser
    {
        public string FelhasznaloNev { get; set; } = null!;

        public string Email { get; set; }

        public int Jogosultsag { get; set; }

        public string Token { get; set; }

        public int Xp { get; set; }

        public int Streak { get; set; }
    }
}
