import { Box, Card, CardContent, CardMedia, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useValue } from '../../../context/ContextProvider';

const PopupGenerator = ({ popupInfo }) => {
  const { company, usageType, genType, model, serialNumber, power, images } = popupInfo;
  const { dispatch } = useValue();
  return (
    <Card sx={{ 
      maxWidth: 400, 
      display: 'flex', 
      cursor: 'pointer', 
    }} 
    onClick={() =>
      dispatch({ type: 'UPDATE_GENERATOR', payload: popupInfo })
    }>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} >
          <Typography component="div" variant="h6">
            {company}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {usageType}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {genType}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {power}
          </Typography>
        </CardContent>
      </Box>
      {images.map((url) => (
        <CardMedia
          key={url}
          component="img"
          sx={{ width: 151 }}
          image={url}
          alt="generator"
        />
      ))}
      {/* <ImageListItem sx={{ display: 'block' }}>
        <ImageListItemBar
          sx={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
            zIndex: 2,
          }}
          title={company}
          position="top"
        />
        <ImageListItemBar
          title={usageType}
          subtitle='Payment Status: Pending'
          sx={{ zIndex: 2 }}
        />
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay
          pagination={{ clickable: true }}
          style={{
            '--swiper-pagination-color': 'rgba(255,255,255, 0.8)',
            '--swiper-pagination-bullet-inactive-color': '#fff',
            '--swiper-pagination-bullet-inactive-opacity': 0.5,
          }}
        >
          {images.map((url) => (
            <SwiperSlide key={url}>
              <Box
                component="img"
                src={url}
                alt="generator"
                sx={{
                  height: '200px',
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  cursor: 'pointer',
                  objectFit: 'cover',
                }}
                onClick={() =>
                  dispatch({ type: 'UPDATE_GENERATOR', payload: popupInfo })
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageListItem> */}
    </Card>
  );
};

export default PopupGenerator;
