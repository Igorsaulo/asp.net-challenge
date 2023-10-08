"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoUtils = void 0;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const uuid_1 = require("uuid");
class VideoUtils {
    async saveVideo(file) {
        const tmpDir = path.join(process.cwd(), 'tmp', 'videos');
        if (!fs.existsSync(tmpDir)) {
            fs.mkdirSync(tmpDir, { recursive: true });
        }
        const fileName = (0, uuid_1.v4)() + path.extname(file.originalname);
        const filePath = path.join(tmpDir, fileName);
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(filePath);
                }
            });
        });
    }
    formatSize(sizeInBytes) {
        const fileSizeInMB = sizeInBytes / (1024 * 1024);
        const fileSizeInGB = fileSizeInMB / 1024;
        if (fileSizeInGB >= 1) {
            return fileSizeInGB.toFixed(2) + ' GB';
        }
        else if (fileSizeInMB >= 1) {
            return fileSizeInMB.toFixed(2) + ' MB';
        }
        else {
            return sizeInBytes + ' bytes';
        }
    }
    getVideoMetadata(videoPath) {
        return new Promise((resolve, reject) => {
            ffmpeg.ffprobe(videoPath, (err, metadata) => {
                if (err) {
                    reject(err);
                }
                else {
                    const video = {
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
    delteVideo(videoPath) {
        return new Promise((resolve, reject) => {
            fs.unlink(videoPath, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async readVideoMetadata(file) {
        const videoPath = await this.saveVideo(file);
        const video = await this.getVideoMetadata(videoPath);
        await this.delteVideo(videoPath);
        return video;
    }
    formatDuration(durationInSeconds) {
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
exports.VideoUtils = VideoUtils;
//# sourceMappingURL=video_utils.js.map