import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchUserById,
  fetchUserPosts,
  selectData,
} from '../../redux/userPost/userPostSlice';
import UserCard from '../../component/card/user';
import PostCard from '../../component/card/post';
import ScreenTitle from '../../component/screenTitle';
import { Typography } from '@mui/material';
import type { User } from '../../type/user';
import type { Post } from '../../type/post';

const UserPosts = () => {
  const { userId } = useParams<{ userId: string }>();

  const {
    user,
    userPosts,
    fetchUserByIdStatus,
    fetchUserPostsStatus,
  } = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fetchUserByIdStatus === 'idle') {
      dispatch(fetchUserById(Number(userId)))
    }
  }, [fetchUserByIdStatus, dispatch, userId])

  useEffect(() => {
    if (fetchUserPostsStatus === 'idle') {
      dispatch(fetchUserPosts(Number(userId)))
    }
  }, [fetchUserPostsStatus, dispatch, userId])

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
  }

  const renderUserPosts = () => {
    if (fetchUserPostsStatus === 'failed') {
      return <>Fail to fetch user</>;
    }
  
    if (fetchUserPostsStatus === 'loading') {
      return <>Loading...</>
    }

    if (fetchUserPostsStatus === 'succeeded' && !userPosts.length) {
      return <>No Comment Found.</>;
    }

    return userPosts.map((post: Post) => {
      const key = `post-${post.id}`;

      return (
        <Box mb="18px">
          <PostCard
            key={key}
            post={post}
            userId={userId as unknown as number}
          />
        </Box>
      )
    })
  };

  return (
    <Box p="16px">
      <ScreenTitle title="User Post" />
      <Box mt="24px">
        {renderUserinfo()}
      </Box>

      <Box mt="24px">
        <Typography variant="h6">Post List</Typography>
        <Box mt="16px">
          {renderUserPosts()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPosts;
