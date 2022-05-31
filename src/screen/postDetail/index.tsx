import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ScreenTitle from '../../component/screenTitle';
import CommentCard from '../../component/card/comment';
import {
  fetchPostById,
  fetchCommentByPostId,
  selectData,
} from '../../redux/postDetail/postDetailSlice';
import type { Comment } from '../../type/comment';  

const PostDetailScreen = () => {
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

    return comments.map((comment: Comment) => {
      const key = `comment-${comment.id}`;

      return (
        <Box mb="16px">
          <CommentCard key={key} comment={comment} />
        </Box>
      )
    });
  };

  return (
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
  )
};

export default PostDetailScreen;
