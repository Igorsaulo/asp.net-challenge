import { Injectable } from '@nestjs/common';
import { Video } from './types/video_type';
// import { VideoUtils } from './utils/video_utils';
import { VideoUtils } from './utils/video_utils';

@Injectable()
export class VideoService {

    constructor(private readonly videoUtils: VideoUtils) { }

    async getVideoMetadata(file: File): Promise<Video> {

        const metadata = await this.videoUtils.readVideoMetadata(file);
        return metadata;
    }
}
