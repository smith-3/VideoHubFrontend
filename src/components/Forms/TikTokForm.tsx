import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Paper, Switch, FormControlLabel } from '@mui/material';
import { Upload } from 'lucide-react';
import TagInput from '../Tag/TagInput';
import { Tiktok } from '@/interfaces/FormData/TiktokData';
import { Video } from '@/interfaces/Video';
import { UploadStatus } from '@/enums/UploadStatus';
import { VideoService } from '@/hooks/VideoService';
import { uploadVideo } from '@/api/uploadTiktok';

interface TikTokFormProps {
    videoDefault: Video;
}

const TikTokForm: React.FC<TikTokFormProps> = ({ videoDefault }) => {
    const videoService = VideoService.getInstance();  // Accede a la única instancia
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [video, setVideo] = useState<Video>(videoDefault);

    // Sincroniza el estado local del video con las props recibidas
    useEffect(() => {
        setVideo(videoDefault);
    }, [videoDefault]);

    const updateTiktok = (tiktokParams: Tiktok) => {
        videoService.updateTiktokParams(video.id, tiktokParams);
        setVideo(videoService.getVideoById(video.id) as Video);
        //videoService.updateVideo(video)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        updateTiktok({
            ...video.tiktok,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleTagsChange = (newTags: string[]) => {
        updateTiktok({
            ...video.tiktok,
            tags: newTags
        });
    };

    const handleMentionsChange = (newMentions: string[]) => {
        updateTiktok({
            ...video.tiktok,
            mentions: newMentions
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData();
        formData.append('title', video.tiktok.title);
        video.tiktok.tags.forEach(tag => formData.append('tags', tag));
        video.tiktok.mentions.forEach(mention => formData.append('mentions', mention));
        formData.append('file', video.videoFile); // Suponiendo que el archivo de video está disponible
        try {
            const result = await uploadVideo(formData);
            updateTiktok({
                ...video.tiktok,
                status: UploadStatus.Subido,
            });
            console.log(result.message);
        } catch (error) {
            console.error(`Error al subir el video a TikTok:`, error);
            updateTiktok({
                ...video.tiktok,
                status: UploadStatus.Fallido,
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Upload />
                TikTok
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '16px' }}>
                    <Typography variant="body2" component="label" htmlFor="tiktok-title" style={{ display: 'block', marginBottom: '8px' }}>
                        Título
                    </Typography>
                    <TextField
                        id="tiktok-title"
                        name="title"
                        value={video.tiktok.title}
                        onChange={handleChange}
                        placeholder="Introduce el título del video"
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <Typography variant="body2" component="label" htmlFor="tiktok-tags" style={{ display: 'block', marginBottom: '8px' }}>
                        Tags
                    </Typography>
                    <TagInput tags={video.tiktok.tags} setTags={handleTagsChange} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <Typography variant="body2" component="label" htmlFor="tiktok-mentions" style={{ display: 'block', marginBottom: '8px' }}>
                        Menciones
                    </Typography>
                    <TagInput tags={video.tiktok.mentions} setTags={handleMentionsChange} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <FormControlLabel
                        control={<Switch name="schedule" checked={video.tiktok.schedule} onChange={handleChange} />}
                        label="Programar publicación"
                    />
                </div>

                {video.tiktok.schedule && (
                    <div style={{ marginBottom: '16px' }}>
                        <Typography variant="body2" component="label" htmlFor="tiktok-schedule" style={{ display: 'block', marginBottom: '8px' }}>
                            Fecha y Hora de Publicación
                        </Typography>
                        <TextField
                            id="tiktok-schedule"
                            name="scheduleDate"
                            type="datetime-local"
                            value={video.tiktok.scheduleDate}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={isUploading ? <Upload /> : undefined}
                    disabled={isUploading}
                >
                    {isUploading ? 'Subiendo...' : 'Subir a TikTok'}
                </Button>
            </form>
        </Paper>
    );
};

export default TikTokForm;
