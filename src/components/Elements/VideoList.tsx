import { Video } from "@/interfaces/Video";
import { Card, CardContent, CardMedia, IconButton, Box, Typography } from "@mui/material";
import { Platform, getPlatformDetails } from '@/enums/Platform';
import { UploadStatus } from "@/enums/UploadStatus";
import React from 'react';

const getIconColor = (status: UploadStatus, platform: Platform) => {
    switch (status) {
        case UploadStatus.Subido:
            return 'grey';
        case UploadStatus.Pendiente:
            return getPlatformDetails(platform).color;
        case UploadStatus.Fallido:
            return 'red';
        default:
            return 'grey';
    }
};

export const VideoList: React.FC<{ videos: Video[], setSelected: (video: Video) => void }> = ({ videos, setSelected }) => {
    return (
        <>
            {videos.map(video => (
                <Card 
                    key={video.id} 
                    sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px', cursor: 'pointer' }} 
                    onClick={() => setSelected(video)}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                        <CardContent sx={{ flex: '1 0 auto', display: 'flex', alignItems: 'center' }}>
                            {video.title.length > 15 ? `${video.title.substring(0, 18)}...` : video.title}
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            {Object.values(Platform).map(platform => {
                                const { color, icon: Icon } = getPlatformDetails(platform);
                                return (
                                    <IconButton 
                                        key={platform} 
                                        aria-label={platform} 
                                        onClick={(e) => { e.stopPropagation(); }}
                                    >
                                        <Icon sx={{ height: 38, width: 38, color: getIconColor(video[platform].status, platform) }} />
                                    </IconButton>
                                );
                            })}
                        </Box>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: 151, marginLeft: 'auto' }}
                        image={video.thumbnailUrl}
                        alt={video.title}
                    />
                </Card>
            ))}
        </>
    );
};
