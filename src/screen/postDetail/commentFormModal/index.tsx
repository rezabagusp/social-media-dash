import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'

import type { Comment } from '../../../type/comment';

interface Props {
  comment?: Comment,
  onClose: () => void,
  onSubmit: (commentText: string) => void,
  isEdit?: boolean,
}

const CommentForm = ({
  comment: initialComment,
  onClose,
  onSubmit,
  isEdit = false,
}: Props) => {
  const [commentText, setCommentText] = useState(
    initialComment?.body || ''
  );
  const submitBtnText = isEdit ? 'Edit Comment' : 'Add Comment';
  const formTitle = isEdit ? 'Edit Comment' : 'Add New Comment';
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(commentText);
  }

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>{formTitle}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            value={commentText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
            autoFocus
            margin="dense"
            id="comment-text"
            label="Comment text"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              disabled={!commentText.length}
              type="submit"
            >
              {submitBtnText}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentForm;
