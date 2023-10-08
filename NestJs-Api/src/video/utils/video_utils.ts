import * as ffmpeg from 'fluent-ffmpeg';
import { Video } from '..//types/video_type';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as UUID } from 'uuid';
import { IVideoUtils } from './interfaces/ivideo_utils';

export class VideoUtils implements IVideoUtils {
    async saveVideo(file: File): Promise<string> {
        const tmpDir : string = path.join(process.cwd(), 'tmp', 'videos');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }

        //@ts-ignore
        const fileName = UUID() + path.extname(file.originalname);
        const filePath = path.join(tmpDir, fileName);

        return new Promise((resolve, reject) => {
            //@ts-ignore
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(filePath);
                }
            });
        });
    }

    formatSize(sizeInBytes: number): string {
        const fileSizeInMB : number = sizeInBytes / (1024 * 1024);
        const fileSizeInGB : number = fileSizeInMB / 1024;

        if (fileSizeInGB >= 1) {
            return fileSizeInGB.toFixed(2) + ' GB';
        } else if (fileSizeInMB >= 1) {
            return fileSizeInMB.toFixed(2) + ' MB';
        } else {
            return sizeInBytes + ' bytes';
        }
    }

    getVideoMetadata(videoPath: string): Promise<Video> {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(videoPath, (err, metadata: any) => {
                if (err) {
                    reject(err);
                } else {
                    const video: Video = {
                        type: metadata.format.format_long_name,
                        duration: this.formatDuration(metadata.format.duration),
                        resolution: metadata.streams[0].width + 'x' + metadata.streams[0].height,
                        frameRate: metadata.streams[0].r_frame_rate,
                        videoCodec: metadata.streams[0].codec_long_name,
                        audioCodec: metadata.streams[1].codec_long_name,
                        audioSampleRate: metadata.streams[1].sample_rate,
                        audioChannels: metadata.streams[1].channels,
                        size: this.formatSize(metadata.format.size)
                    };

                    resolve(video);
                }
            });
        });
    }

    delteVideo(videoPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(videoPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async readVideoMetadata(file: File): Promise<Video> {
        const videoPath = await this.saveVideo(file);
        const video = await this.getVideoMetadata(videoPath);
        await this.delteVideo(videoPath);
        return video;
    }

    formatDuration(durationInSeconds: number): string {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds - (hours * 3600)) / 60);
        const seconds = Math.floor(durationInSeconds - (hours * 3600) - (minutes * 60));

        let result = '';
        if (hours > 0) {
            result += hours + 'h ';
        }
        if (minutes > 0) {
            result += minutes + 'm ';
        }
        if (seconds > 0) {
            result += seconds + 's';
        }

        return result;
    }
}