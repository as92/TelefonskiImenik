using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Imenik.Data;
using Imenik.Models;

namespace Imenik.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TelefonskiImeniksController : ControllerBase
    {
        private readonly ImenikContext _context;

        public TelefonskiImeniksController(ImenikContext context)
        {
            _context = context;
        }

        // GET: api/TelefonskiImeniks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TelefonskiImenik>>> GetTelefonskiImenik()
        {
            return await _context.TelefonskiImenik.ToListAsync();
        }

        // GET: api/TelefonskiImeniks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TelefonskiImenik>> GetTelefonskiImenik(int id)
        {
            var telefonskiImenik = await _context.TelefonskiImenik.FindAsync(id);

            if (telefonskiImenik == null)
            {
                return NotFound();
            }

            return telefonskiImenik;
        }

        // PUT: api/TelefonskiImeniks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTelefonskiImenik(int id, TelefonskiImenik telefonskiImenik)
        {
            
            if (id != telefonskiImenik.ImenikId)
            {
                return BadRequest();
            }
            //foreach (TelefonskiImenik t in _context.TelefonskiImenik)
            //{
            //    if ((t.ImenikId != id) && (t.Broj == telefonskiImenik.Broj))
            //    {
            //        brojPostoji = true;
            //    }
            //}

            TelefonskiImenik test = _context.TelefonskiImenik.Where(a => (a.ImenikId != id && a.Broj == telefonskiImenik.Broj)).FirstOrDefault();
            if (test != null)
            {
                return Conflict(new { message = $"Telefonski broj u imeniku već postoji: '{telefonskiImenik.Broj}'!" });
            }
            else
            {
                TelefonskiImenik ti = _context.TelefonskiImenik.Where(p => p.ImenikId == telefonskiImenik.ImenikId).FirstOrDefault();
                ti.Ime = telefonskiImenik.Ime;
                ti.Broj = telefonskiImenik.Broj;
                ti.Adresa = telefonskiImenik.Adresa;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            
        }

        // POST: api/TelefonskiImeniks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TelefonskiImenik>> PostTelefonskiImenik(TelefonskiImenik telefonskiImenik)
        {
            if (TelefonskiImenikExists(telefonskiImenik.Broj))
            {
                return Conflict(new { message = $"Telefonski broj u imeniku već postoji: '{telefonskiImenik.Broj}'!" });

            }

            _context.TelefonskiImenik.Add(telefonskiImenik);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetTelefonskiImenik", new { id = telefonskiImenik.ImenikId }, telefonskiImenik);
        }

        // DELETE: api/TelefonskiImeniks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TelefonskiImenik>> DeleteTelefonskiImenik(int id)
        {
            var telefonskiImenik = await _context.TelefonskiImenik.FindAsync(id);
            if (telefonskiImenik == null)
            {
                return NotFound();
            }

            _context.TelefonskiImenik.Remove(telefonskiImenik);
            await _context.SaveChangesAsync();

            return telefonskiImenik;
        }

        private bool TelefonskiImenikExists(string broj)
        {
            return _context.TelefonskiImenik.Any(e => e.Broj == broj);
        }
    }
}
