import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideoUtils } from './utils/video_utils';
import { IVideoUtils} from "./utils/interfaces/ivideo_utils";

@Module({
  providers: [VideoService, VideoUtils],
  controllers: [VideoController],
  exports: [VideoService, VideoUtils],
})
export class VideoModule {}
