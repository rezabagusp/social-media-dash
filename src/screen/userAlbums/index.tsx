import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import UserCard from '../../component/card/user';
import ScreenTitle from '../../component/screenTitle';
import {
  fetchUserById,
  fetchUserAlbum,
  selectData,
} from '../../redux/userAlbum/userAlbumSlice';
import type { User } from '../../type/user';
import type { Album } from '../../type/album';

const UserAlbums = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    user,
    fetchUserByIdStatus,
    albums,
    fetchAlbumStatus,
  } = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserById(Number(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(fetchUserAlbum(Number(userId)))
  }, [dispatch, userId])

  const renderUserinfo = () => {
    if (fetchUserByIdStatus === 'failed') {
      return <>Fail to fetch user</>;
    }
  
    if (fetchUserByIdStatus === 'loading') {
      return <>Loading...</>
    }

    if (user) {
      return (
        <UserCard user={user as User} withAction={false}/>
      )
    }
  };

  const renderUserAlbums = () => {
    if (fetchAlbumStatus === 'failed') {
      return <>Fail to fetch album</>;
    }
  
    if (fetchAlbumStatus === 'loading') {
      return <>Loading...</>
    }

    if (fetchAlbumStatus === 'succeeded' && !albums.length) {
      return <>No album Found.</>;
    }

    return albums.map((album: Album) => {
      const key = `album-${album.id}`;

      return (
        <Box
          component="li"
          mb="18px"
          key={key}
        >
          <Link to={`/users/${userId}/albums/${album.id}`}>
            {album.title}
          </Link>
        </Box>
      )
    })
  };

  return (
    <Box p="16px">
      <ScreenTitle title="User Album" />
      <Box
        mt="24px"
      >
        {renderUserinfo()}
      </Box>
      <Box mt="24px">
        <Typography variant="h6">Album List</Typography>
        <Box
          component="ul"
          mt="24px"
        >
          {renderUserAlbums()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserAlbums;
