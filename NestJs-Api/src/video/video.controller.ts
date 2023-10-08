import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Video } from './types/video_type';
import { VideoService } from './video.service';

@Controller('api/video') // Adicione 'api' como prefixo para a rota
export class VideoController {
    constructor(private readonly videoService: VideoService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async getVideoMetadata(@UploadedFile() file: File): Promise<Video> {
        const metadata = await this.videoService.getVideoMetadata(file);
        return metadata;
    }
}
