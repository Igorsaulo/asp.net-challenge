import { Video } from '..//types/video_type';
import { IVideoUtils } from './interfaces/ivideo_utils';
export declare class VideoUtils implements IVideoUtils {
    saveVideo(file: File): Promise<string>;
    formatSize(sizeInBytes: number): string;
    getVideoMetadata(videoPath: string): Promise<Video>;
    delteVideo(videoPath: string): Promise<void>;
    readVideoMetadata(file: File): Promise<Video>;
    formatDuration(durationInSeconds: number): string;
}
