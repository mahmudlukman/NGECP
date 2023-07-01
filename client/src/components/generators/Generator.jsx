import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Close, StarBorder } from '@mui/icons-material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/zoom';
import './swiper.css';

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Generator = () => {
  const {
    state: { generator },
    dispatch,
  } = useValue();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (generator) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${generator.lng},${generator.lat}.json?access_token=${import.meta.env.VITE_REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [generator]);

  const handleClose = () => {
    dispatch({ type: 'UPDATE_GENERATOR', payload: null });
  };
  return (
    <Dialog
      fullScreen
      open={Boolean(generator)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {generator?.company}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {generator?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="generator" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={generator?.uName || ''}
            sx={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              zIndex: 2,
            }}
          >
            <Avatar src={generator?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Company: '}
              </Typography>
              <Typography component="span">
                {generator?.company}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Usage Type: '}
              </Typography>
              <Typography component="span">
                {generator?.usageType}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Address: '}
              </Typography>
              <Typography component="span">
              {place?.place_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Generator Fuel Type: '}
              </Typography>
              <Typography component="span">
                {generator?.genType}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Contact Person: '}
              </Typography>
              <Typography component="span">
              {generator?.uName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Generator Model: '}
              </Typography>
              <Typography component="span">
                {generator?.model}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Payment Status: '}
              </Typography>
              <Typography component="span">
              Pending
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Power: '}
              </Typography>
              <Typography component="span">
                {generator?.power}
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Phone Number: '}
              </Typography>
              <Typography component="span">{<Typography component="span">
                {generator?.uPhone}
              </Typography>}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {'Serial Number: '}
              </Typography>
              <Typography component="span">{generator?.serialNumber}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Generator;
