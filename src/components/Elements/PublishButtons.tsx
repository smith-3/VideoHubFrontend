import { Stack, IconButton } from '@mui/material';
import { Platform, getPlatformDetails } from '@/enums/Platform'; // Asegúrate de ajustar la ruta de importación
import { Share } from '@mui/icons-material';

interface PublishButtonsProps {
    handlePublish: (platforms: Platform[]) => void;
}

export const PublishButtons: React.FC<PublishButtonsProps> = ({ handlePublish }) => (
    <Stack direction="row" spacing={2} mb={2} justifyContent="center" alignItems="center">
        <Stack direction="column" alignItems="center">
            <IconButton
                title="Publicar en todas"
                onClick={() => handlePublish([Platform.TikTok, Platform.Facebook, Platform.Instagram])}
                sx={{
                    color: '#555',
                    backgroundColor: '#fff',
                    borderRadius: '10%',
                    padding: 1.5,
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                }}
            >
                <Share fontSize="large" />
            </IconButton>
        </Stack>
        {Object.values(Platform).map(platform => {
            const { color, icon: Icon } = getPlatformDetails(platform);
            return (
                <Stack key={platform} direction="column" alignItems="center">
                    <IconButton
                        title={`Publicar en ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                        onClick={() => handlePublish([platform])}
                        sx={{
                            color: color,
                            backgroundColor: '#fff',
                            borderRadius: '10%',
                            padding: 1.5,
                            '&:hover': {
                                backgroundColor: '#f0f0f0',
                            },
                        }}
                    >
                        <Icon fontSize="large" />
                    </IconButton>
                </Stack>
            );
        })}
    </Stack>
);
