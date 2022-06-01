import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchUserById,
  fetchUserPosts,
  addNewPost,
  editPost,
  deletePost,
  userPostDeleted,
  selectData,
} from '../../redux/userPost/userPostSlice';
import UserCard from '../../component/card/user';
import PostCard from '../../component/card/post';
import ScreenTitle from '../../component/screenTitle';
import ConfirmationDialog from '../../component/confirmationDialog';
import type { User } from '../../type/user';
import type { Post } from '../../type/post';

import PostModalForm, { PostModalFormData } from './postModalForm';

type ModalInfo = {
  type: 'addPost' | 'editPost' | 'deletePost',
  data?: Post,
};

const UserPosts = () => {
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);

  const { userId } = useParams<{ userId: string }>();

  const {
    user,
    userPosts,
    fetchUserByIdStatus,
    fetchUserPostsStatus,
  } = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserById(Number(userId)))
  }, [dispatch, userId])

  useEffect(() => {
    dispatch(fetchUserPosts(Number(userId)))
  }, [dispatch, userId])

  const handleAddPost = async (formData: PostModalFormData) => {
    const payload = {
      ...formData,
      userId: 11,
    }

    try {
      await dispatch(addNewPost(payload as unknown as Post)).unwrap();
      setModalInfo(null);
      alert('Add new post success!')
    } catch {
      alert('Fail to add new post');
    }
  };

  const handleEditPost = async (formData: PostModalFormData) => {
    const payload = {
      ...modalInfo?.data,
      ...formData,
    }

    try {
      await dispatch(editPost(payload as unknown as Post)).unwrap();
      setModalInfo(null);
      alert('Edit post success!')
    } catch {
      alert('Fail to edit post');
    }
  };

  const handleClickEditPost = (post: Post) => {
    setModalInfo({
      type: 'editPost',
      data: post,
    })
  };

  const handleClickDeletePost = (post: Post) => {
    setModalInfo({
      type: 'deletePost',
      data: post,
    })
  };

  const handleDeletePost = async (post: Post) => {
    try {
      await dispatch(deletePost(post.id)).unwrap();
      setModalInfo(null);
      dispatch(userPostDeleted(post.id));
      alert('Delete post success!')
    } catch {
      alert('Fail to delete post');
    }
  };

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
        <Box
          mb="18px"
          key={key}
        >
          <PostCard
            post={post}
            userId={userId as unknown as number}
            onClickEdit={() => handleClickEditPost(post)}
            onClickDelete={() =>handleClickDeletePost(post)}
          />
        </Box>
      )
    })
  };

  const renderModal = () => {
    if (modalInfo?.type === 'addPost') {
      return (
        <PostModalForm
          onClose={() => setModalInfo(null)}
          onSubmit={handleAddPost}
        />
      )
    }

    if (modalInfo?.type === 'editPost') {
      return (
        <PostModalForm
          post={modalInfo.data as Post}
          onClose={() => setModalInfo(null)}
          onSubmit={handleEditPost}
          isEdit
        />
      )
    }

    if (modalInfo?.type === 'deletePost') {
      return (
        <ConfirmationDialog
          title="Are sure want to delete this post ?"
          onClose={() => setModalInfo(null)}
          onSubmit={() => handleDeletePost(modalInfo.data as Post)}
        />
      )
    }

    return null;
  };

  return (
    <>
      <Box p="16px">
        <ScreenTitle title="User Post" />
        <Box mt="24px">
          {renderUserinfo()}
        </Box>

        <Box mt="24px">
          <Typography variant="h6">Post List</Typography>
          <Box mt="8px">
            <Button
              variant="outlined"
              onClick={() => setModalInfo({type: 'addPost'})}
            >
              Add New Post
            </Button>
          </Box>
          <Box mt="16px">
            {renderUserPosts()}
          </Box>
        </Box>
      </Box>
      {renderModal()}
    </>
  );
};

export default UserPosts;
