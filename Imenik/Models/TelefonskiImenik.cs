using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Imenik.Models
{
    public class TelefonskiImenik
    {
		[Key]
		public int ImenikId { get; set; }

		[Required]
		public string Ime { get; set; }

		[Required]
		public string Broj { get; set; }

		[Required]
		public string Adresa { get; set; }
		

	}
}
