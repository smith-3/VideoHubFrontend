import { Video } from "@/interfaces/Video";
import { Tiktok } from "@/interfaces/FormData/TiktokData";
import { useState } from 'react';

export class VideoService {
    private static instance: VideoService;  // La instancia Singleton
    private videos: Video[] = [];
    private selectedVideo: Video | null = null;

    // Constructor privado para evitar la creación externa de nuevas instancias
    private constructor() {}

    // Método estático para obtener la instancia única
    public static getInstance(): VideoService {
        if (!VideoService.instance) {
            VideoService.instance = new VideoService();
        }
        return VideoService.instance;
    }

    // Métodos públicos
    public addVideos(newVideos: Video[]): void {
        this.videos = [...this.videos, ...newVideos];
        console.log("Videos added:", newVideos);
    }

    public removeVideo(videoId: string): void {
        this.videos = this.videos.filter((video) => video.id !== videoId);
        console.log(`Video with ID ${videoId} removed.`);
    }

    public updateVideo(updatedVideo: Video): void {
        this.videos = this.videos.map((video) =>
            video.id === updatedVideo.id ? updatedVideo : video
        );
        console.log(`Video with ID ${updatedVideo.id} updated.`, updatedVideo);
    }

    public updateTiktokParams(videoId: string, tiktokParams: Tiktok): void {
        this.videos = this.videos.map((video) =>
            video.id === videoId ? { ...video, tiktok: tiktokParams } : video
        );
        console.log(`TikTok parameters updated for video with ID ${videoId}.`, tiktokParams);
    }

    public selectVideo(videoId: string): void {
        this.selectedVideo = this.videos.find((video) => video.id === videoId) || null;
        console.log(`Video with ID ${videoId} selected.`, this.selectedVideo);
    }

    // Nuevo método para obtener un video por su ID
    public getVideoById(videoId: string): Video | null {
        return this.videos.find((video) => video.id === videoId) || null;
    }

    public getVideos(): Video[] {
        return this.videos;
    }

    public getSelectedVideo(): Video | null {
        return this.selectedVideo;
    }
}
