using Newtonsoft.Json;
using Flurl;
using Flurl.Http;

namespace Asp.Challenge.Repositories
{
    public class VideoRepository : IvideoRepository
    {
        public async Task<VideoViewModel> readVideo(IFormFile file)
        {
            try
            {
                var response = await "http://localhost:3000"
                    .AppendPathSegment("api/video")
                    .PostMultipartAsync(
                        content => content.AddFile("file", file.OpenReadStream(), file.FileName)
                    );

                var viewModel = await response.GetJsonAsync<VideoViewModel>();
                return viewModel;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao enviar o arquivo: {ex.Message}");
                return null;
            }
        }
    }
}
