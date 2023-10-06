using System.ComponentModel.DataAnnotations;
namespace Models
{
    public class Polica{
    [Key]
    public int ID{get; set;}
    public required string NazivPolice{get;set;}
    public required int MaxBrojDVD{get; set;}
    public required int TrenutniBrojDVD{get; set;}

    }
}