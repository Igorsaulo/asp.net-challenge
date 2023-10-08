namespace Asp.Challenge.Repositories
{
    public interface IvideoRepository
    {
        Task<VideoViewModel> readVideo(IFormFile file);
    }
}