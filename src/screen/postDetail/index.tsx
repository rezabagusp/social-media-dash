import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ScreenTitle from '../../component/screenTitle';
import CommentCard from '../../component/card/comment';
import ConfirmationDialog from '../../component/confirmationDialog';
import {
  fetchPostById,
  fetchCommentByPostId,
  deleteCommentById,
  addNewComment,
  editComment,
  commentDeleted,
  selectData,
} from '../../redux/postDetail/postDetailSlice';
import type { Comment } from '../../type/comment';  
import type { Post } from '../../type/post';  

import CommentFormModal from './commentFormModal';
import { snackbarShow } from '../../redux/snackbar/snackbarSlice';

type ModalInfo = {
  type: 'deleteComment' | 'deletePost' | 'addComment' | 'editComment',
  data?: Comment | Post,
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
      dispatch(snackbarShow('Delete Comment Success!'));
    } catch (err) {
      dispatch(snackbarShow('Something went wrong! fail to delete comment.'));
    }
  };

  const handleClickEditComment = (comment: Comment) => {
    setModalInfo({
      type: 'editComment',
      data: comment
    })
  };

  const handleAddNewComment = async (commentText: string) => {
    const payload = {
      postId,
      name: 'Social Media Admin',
      email: 'admin@social.media',
      body: commentText,
    }

    try {
      await dispatch(addNewComment(payload as unknown as Comment)).unwrap();
      setModalInfo(null);
      dispatch(snackbarShow('Add new comment success!'));
    } catch {
      dispatch(snackbarShow('Fail to add new comment'));
    }
  };

  const handleEditComment = async (newCommentText: string) => {
    const currentComment = modalInfo?.data as Comment;

    const payload = {
      ...currentComment,
      body: newCommentText,
    }

    try {
      await dispatch(editComment(payload as unknown as Comment)).unwrap();
      setModalInfo(null);
      dispatch(snackbarShow('Edit comment success!'))
    } catch {
      dispatch(snackbarShow('Fail to edit comment'));
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
        <Box
          mb="16px"
          key={key}
        >
          <CommentCard
            comment={comment}
            onClickEdit={() => handleClickEditComment(comment)}
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

    if (modalInfo?.type === 'addComment') {
      return (
        <CommentFormModal
          onClose={() => setModalInfo(null)}
          onSubmit={handleAddNewComment}
        />
      )
    }

    if (modalInfo?.type === 'editComment') {
      return (
        <CommentFormModal
          comment={modalInfo.data as Comment}
          onClose={() => setModalInfo(null)}
          onSubmit={handleEditComment}
          isEdit
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
          <Box mt="8px">
            <Button
              variant="outlined"
              onClick={() => setModalInfo({type: 'addComment'})}
            >
              Add New Comment
            </Button>
          </Box>
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
