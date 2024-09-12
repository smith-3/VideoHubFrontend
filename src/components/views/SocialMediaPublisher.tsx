'use client'

import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { VideoList } from '../Elements/VideoList'
import { PublishButtons } from '../Elements/PublishButtons'
import { Video } from '@/interfaces/Video'
import { createInitialTiktok } from '@/interfaces/FormData/TiktokData'
import PublishVideo from '../Elements/PublishVideo'
import DropzoneArea from '../Elements/DropzoneArea'
import { InstagramData } from '@/interfaces/FormData/InstagramData'
import { FacebookData } from '@/interfaces/FormData/FacebookData'

import { VideoService } from '@/hooks/VideoService'

export default function SocialMediaPublisher() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selected, setSelected] = useState<Video | null>(null);
    const videoService = VideoService.getInstance();  // Accede a la única instancia

    useEffect(() => {
        setVideos(videoService.getVideos());
    }, [videoService, selected]);

    useEffect(() => {
        setSelected(videoService.getSelectedVideo());
    }, [videoService]);

    const handleVideoSelection = (video: Video) => {
        setSelected(video);
        videoService.selectVideo(video.id); // Actualiza la selección en VideoService si es necesario
    }

    const handlePublish = (platforms: ('tiktok' | 'facebook' | 'instagram')[]) => {
        // const videosToPublish = videos?.filter(video => video.check);
        // console.log('Publishing videos:', videosToPublish, 'to platforms:', platforms);
    };

    const handleAddVideo = (newVideoFiles: File[]) => {
        const newVideos: Video[] = newVideoFiles.map((newVideoFile, index) => ({
            id: (videos.length + index + 1).toString(),
            title: newVideoFile.name,
            videoFile: newVideoFile,
            thumbnailUrl: 'https://mui.com/static/images/cards/live-from-space.jpg',
            check: false,
            tiktok: createInitialTiktok(),
            facebook: FacebookData,
            instagram: InstagramData
        }));
        videoService.addVideos(newVideos);
        setVideos(videoService.getVideos());
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Barra izquierda */}
            <Box
                sx={{
                    width: '20%',
                    bgcolor: '#2b2d33',
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
                {/* PublishButtons al inicio */}
                <Box sx={{ mb: 2 }}>
                    <PublishButtons handlePublish={handlePublish} />
                </Box>

                {/* VideoList que ocupe el espacio restante */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'scroll',  // Permite el desplazamiento vertical
                        mb: 2,
                        '&::-webkit-scrollbar': {
                            display: 'none',  // Oculta la barra de desplazamiento en WebKit
                        },
                        scrollbarWidth: 'none',  // Oculta la barra de desplazamiento en Firefox
                    }}
                >
                    <VideoList videos={videos} setSelected={handleVideoSelection} />
                </Box>

                {/* DropzoneArea al final */}
                <Box sx={{ mt: 'auto' }}>
                    <DropzoneArea onDrop={handleAddVideo} />
                </Box>
            </Box>

            {/* Contenido central */}
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#f5f5f5',
                }}
            >
                {selected ? (
                    <PublishVideo video={selected}/>
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        Selecciona un video para comenzar
                    </Typography>
                )}
            </Box>

            {/* Barra derecha */}
            <Box
                sx={{
                    width: '25%',
                    bgcolor: '#e0e0e0',
                    borderLeft: '1px solid #ddd',
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                }}
            >
            </Box>
        </Box>
    )
}
