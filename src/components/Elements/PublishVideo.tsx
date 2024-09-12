'use client'
import React, { useState } from 'react';
import { Tabs, Tab, styled } from '@mui/material';
import { Platform, getPlatformDetails } from '@/enums/Platform'; // Ajusta la ruta según sea necesario
import TikTokForm from '../Forms/TikTokForm';
import { Video } from '@/interfaces/Video';

// Estilos personalizados para los Tabs
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: '#000',
    backgroundColor: '#fff',
  },
  '& .Mui-selected': {
    color: '#fff !important',
  },
  // Los estilos de fondo ya se aplicarán desde el mapa de plataformas
}));

const PublishVideo: React.FC<{ video: Video }> = ({ video }) => {
  const [tabValue, setTabValue] = useState<Platform>(Platform.TikTok);

  return (
    <div style={{ width: '100%', height: '100%', padding: '20px', boxSizing: 'border-box' }}>
      <StyledTabs
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue as Platform)}
        variant="fullWidth"
        style={{ backgroundColor: '#eee', padding: '0 10px' }}
      >
        {Object.values(Platform).map(platform => {
          const { color, icon: Icon } = getPlatformDetails(platform);
          return (
            <Tab
              key={platform}
              value={platform}
              label={<Icon />}
              style={{ backgroundColor: tabValue === platform ? color : undefined }}
            />
          );
        })}
      </StyledTabs>

      <div style={{ padding: '20px' }}>
        {tabValue === Platform.TikTok && <TikTokForm videoDefault={video} />}
        {tabValue === Platform.Facebook && <TikTokForm videoDefault={video} />}
        {tabValue === Platform.Instagram && <TikTokForm videoDefault={video} />}
      </div>
    </div>
  );
};

export default PublishVideo;
