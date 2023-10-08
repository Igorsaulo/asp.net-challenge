using Microsoft.AspNetCore.Mvc;
using Asp.Challenge.Repositories;

namespace Asp.Challenge.Controllers;

[ApiController]
[Route("api/video")]
public class VideoControllerApi : ControllerBase
{
    private readonly IvideoRepository _videoRepository;

    public VideoControllerApi(IvideoRepository videoRepository)
    {
        _videoRepository = videoRepository;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadVideo(IFormFile file)
    {
        var video = await _videoRepository.readVideo(file);
        return Ok(video);
    }
}