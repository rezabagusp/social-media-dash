import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ScreenTitle from '../../component/screenTitle';
import CommentCard from '../../component/card/comment';
import ConfirmationDialog from '../../component/confirmationDialog';
import {
  fetchPostById,
  fetchCommentByPostId,
  deleteCommentById,
  commentDeleted,
  selectData,
} from '../../redux/postDetail/postDetailSlice';
import type { Comment } from '../../type/comment';  
import type { Post } from '../../type/post';  

type ModalInfo = {
  type: 'deleteComment' | 'deletePost',
  data: Post | Comment,
};

const PostDetailScreen = () => {
  const [modalInfo, setModalInfo] = useState<ModalInfo | null>(null);

  const {
    // userId,
    postId,
  } = useParams<{ userId: string, postId: string }>();

  const {
    post,
    fetchPostByIdStatus,
    comments,
    fetchCommentByPostIdStatus,
  } = useAppSelector(selectData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostById(Number(postId)));
  },  [dispatch, postId]);

  useEffect(() => {
    dispatch(fetchCommentByPostId(Number(postId)));
  },  [dispatch, postId]);

  const handleClickDeleteComment = (comment: Comment) => {
    setModalInfo({
      type: 'deleteComment',
      data: comment,
    })
  };

  const handleDeleteComment = async (comment: Comment) => {
    try {
      await dispatch(deleteCommentById(comment.id))
        .unwrap()
      setModalInfo(null);
      dispatch(commentDeleted(comment.id));
      alert('Delete Comment Success!');
    } catch (err) {
      alert('Something went wrong! fail to delete comment.');
    }
  };

  const renderPost = () => {
    if (fetchPostByIdStatus === 'failed') {
      return <>Failed to fetch post</>;
    }

    if (fetchPostByIdStatus === 'loading') {
      return <>Loading...</>;
    }

    if (post) {
      return (
        <Box maxWidth="600px">
          <Box>
            <strong>Title: </strong>:&nbsp;
            {post.title}
          </Box>
          <Box>
            <strong>Content:</strong>&nbsp;
            {post.body}
          </Box>
        </Box>
      );
    }
  };

  const renderComments = () => {
    if (fetchCommentByPostIdStatus === 'failed') {
      return <>Failed to fetch comments</>;
    }

    if (fetchCommentByPostIdStatus === 'loading') {
      return <>Loading...</>;
    }

    if (fetchCommentByPostIdStatus === 'succeeded' && !comments.length) {
      return <>No Comment Found.</>;
    }

    return comments.map((comment: Comment) => {
      const key = `comment-${comment.id}`;

      return (
        <Box mb="16px">
          <CommentCard
            key={key}
            comment={comment}
            onClickEdit={() => {console.log('click edit')}}
            onClickDelete={() => handleClickDeleteComment(comment)}
          />
        </Box>
      )
    });
  };

  const renderModal = () => {
    if (modalInfo?.type === 'deleteComment') {
      return (
        <ConfirmationDialog
          title="Are sure want to delete this comment ?"
          onClose={() => setModalInfo(null)}
          onSubmit={() => handleDeleteComment(modalInfo.data as Comment)}
        />
      )
    }

    return null;
  };

  return (
    <>
      <Box p="16px">
        <ScreenTitle title="Post Detail" />
        <Box mt="24px">
          {renderPost()}
        </Box>
        <Box component="section" mt="24px">
          <Typography variant="h6">
            Comment List
          </Typography>
          <Box mt="24px">
            {renderComments()}
          </Box>
        </Box>
      </Box>
      {renderModal()}
    </>
  )
};

export default PostDetailScreen;
