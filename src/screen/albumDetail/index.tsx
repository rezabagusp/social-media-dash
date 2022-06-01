import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ScreenTitle from '../../component/screenTitle';
import {
  fetchAlbumById,
  fetchPhotos,
  selectData,
} from '../../redux/albumDetail/albumDetailSlice';
import type { Photo } from '../../type/photo';

const AlbumDetail = () => {
  const { albumId } = useParams<{ albumId: string }>();

  const {
    album,
    fetchAlbumByIdStatus,
    photos,
    fetchPhotosStatus,
  } = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAlbumById(Number(albumId)))
  }, [dispatch, albumId])

  useEffect(() => {
    dispatch(fetchPhotos(Number(albumId)))
  }, [dispatch, albumId])

  const renderAlbumInfo = () => {
    if (fetchAlbumByIdStatus === 'failed') {
      return <>Fail to fetch album</>;
    }
  
    if (fetchAlbumByIdStatus === 'loading') {
      return <>Loading...</>
    }

    if (album) {
      return (
        <Typography variant="body1">
          <strong>
            Album name:
          </strong>
          &nbsp;
          {album.title}
        </Typography>
      )
    }
  }

  const renderPhotos = () => {
    if (fetchPhotosStatus === 'failed') {
      return <>Fail to fetch Photos</>;
    }
  
    if (fetchPhotosStatus === 'loading') {
      return <>Loading...</>
    }

    if (fetchPhotosStatus === 'succeeded' && !photos.length) {
      return <>No photo Found.</>;
    }

    return (
      <Grid
        container
        spacing={1}
        columns={{ xs: 1, md: 5}}
      >
        {
          photos.map((photo: Photo) => {
            const key = `photo-${photo.id}`;

            return (
              <Grid
                item
                key={key}
              >
                <a href={photo.url} target="_blank" rel="noreferrer">
                  <img
                    alt={photo.title}
                    src={photo.thumbnailUrl}
                    width={150}
                    height={150}
                  />
                </a>
              </Grid>
            )
          })
        }
      </Grid>      
    )
  };

  return (
    <Box p="16px">
      <ScreenTitle title="Album Detail" />
      <Box component="section">
        <Box mt="24px">
          {renderAlbumInfo()}
        </Box>
        <Box mt="24px">
          <Typography variant="h6">Album List</Typography>
          <Box
            mt="24px"
          >
            {renderPhotos()}
          </Box>
        </Box>
      </Box>
    </Box>
  )
};

export default AlbumDetail;
