import { Video } from './types/video_type';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    getVideoMetadata(file: File): Promise<Video>;
}
