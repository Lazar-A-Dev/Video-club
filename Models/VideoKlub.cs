using System.ComponentModel.DataAnnotations;
namespace Models{
    public class VideoKlub{
        [Key]
        public int ID{get; set;}
        public required string NazivKluba{get; set;}
        public List<Polica>? Police{get; set;}
    }
}