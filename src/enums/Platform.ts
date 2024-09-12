// src/enums/Platform.ts

import { Facebook, Instagram, MusicNote } from '@mui/icons-material';
import { SvgIconComponent } from '@mui/icons-material'; // Importa el tipo correcto

export enum Platform {
    TikTok = 'tiktok',
    Facebook = 'facebook',
    Instagram = 'instagram',
}

interface PlatformDetails {
    color: string;
    icon: SvgIconComponent; // Usa SvgIconComponent para el tipo del ícono
}

const platformDetails: Record<Platform, PlatformDetails> = {
    [Platform.TikTok]: {
        color: '#69C9D0',
        icon: MusicNote,
    },
    [Platform.Facebook]: {
        color: '#4267B2',
        icon: Facebook,
    },
    [Platform.Instagram]: {
        color: '#E4405F',
        icon: Instagram,
    },
};

export const getPlatformDetails = (platform: Platform) => platformDetails[platform];
