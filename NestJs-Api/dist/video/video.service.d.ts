import { Video } from './types/video_type';
import { VideoUtils } from './utils/video_utils';
export declare class VideoService {
    private readonly videoUtils;
    constructor(videoUtils: VideoUtils);
    getVideoMetadata(file: File): Promise<Video>;
}
