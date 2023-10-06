using System.ComponentModel.DataAnnotations;

namespace Asp.Challenge.Models
{
    public class VideoModel
    {
        [Required(ErrorMessage = "O campo video é obrigatório.")]
        public IFormFile Video { get; set; }
    }
}
