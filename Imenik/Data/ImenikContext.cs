using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Imenik.Models;

namespace Imenik.Data
{
    public class ImenikContext : DbContext
    {
        public ImenikContext (DbContextOptions<ImenikContext> options)
            : base(options)
        {
        }

        public DbSet<Imenik.Models.TelefonskiImenik> TelefonskiImenik { get; set; }
    }
}
