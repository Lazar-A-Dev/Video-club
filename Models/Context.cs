using Microsoft.EntityFrameworkCore;
namespace Models
{
    public class Context : DbContext
    {
        public DbSet<Polica>? Police { get; set; }
        public DbSet<VideoKlub>? VideoKlubovi { get; set; }
        public Context(DbContextOptions options) : base(options)
        {

        }
    }
}