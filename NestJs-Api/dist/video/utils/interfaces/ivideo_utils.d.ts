import { Video } from "../../types/video_type";
interface IVideoUtils {
    saveVideo(file: File): Promise<string>;
    formatSize(sizeInBytes: number): string;
    getVideoMetadata(videoPath: string): Promise<Video>;
    readVideoMetadata(file: File): Promise<Video>;
    delteVideo(videoPath: string): Promise<void>;
}
export { IVideoUtils };
