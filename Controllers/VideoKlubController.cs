using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Models{
    [ApiController]
    [Route ("[controller]")]
    public class VideoKlubController : ControllerBase{
        public Context _context;

        public VideoKlubController(Context context){
            _context = context;
        }

        [Route("VratiSveVideoKlubove")]
        [HttpGet]
        public async Task<ActionResult>VratiSveVideoKlubove(){
            try{
                var klub = await _context.VideoKlubovi.Include(p => p.Police).ToListAsync();
                return Ok(klub);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajVideoKlub")]
        [HttpPost]
        public async Task<ActionResult>DodajVideoKlub(VideoKlub klub){
            try{
                await _context.VideoKlubovi.AddAsync(klub);
                await _context.SaveChangesAsync();
                return Ok("Uspesno napravljen video klub");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("DodajKlubuPolicu")]
        [HttpPut]
        public async Task<ActionResult>DodajKlubuPolicu(int idKluba, int idPolice){
            try{
                var klub = await _context.VideoKlubovi.Include(k => k.Police).FirstOrDefaultAsync(k => k.ID == idKluba);
                var pol = await _context.Police.FindAsync(idPolice);

                if(klub == null || pol == null)
                return BadRequest("Id unete police ili kluba nije validan");

                klub.Police.Add(pol);
                await _context.SaveChangesAsync();

                return Ok("Uspesno dodata polica klubu");
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}