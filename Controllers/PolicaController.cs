using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models{
    [ApiController]
    [Route ("[controller]")]
    public class PolicaController : ControllerBase{
        public Context _context;

        public PolicaController(Context context){
            _context = context;
        }

        [Route("VratiSvePolice")]
        [HttpGet]
        public async Task<ActionResult>VratiSvePolice(){
            try{
                var police = await _context.Police.ToListAsync();
                return Ok(police);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajPolicu")]
        [HttpPost]
        public async Task<ActionResult>DodajPolicu(Polica pol){
            try{
                await _context.Police.AddAsync(pol);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljena polica");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajDVD/{IdPolice}/{broj}")]
        [HttpPut]
        public async Task<ActionResult>DodajDVD(int IdPolice, int broj){
            try{
                Polica pol = await _context.Police.FindAsync(IdPolice);

                if(pol == null)
                return BadRequest("Polica sa unetim Id-jem ne postoji");

                var trenutno = pol.TrenutniBrojDVD;
                if(trenutno + broj > pol.MaxBrojDVD)
                return BadRequest("Nema mesta u polici");

                pol.TrenutniBrojDVD+=broj;
                await _context.SaveChangesAsync();
                return Ok("Uspesno dodat dvd polici");
                
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}