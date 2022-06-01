import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle'

import type { Post } from '../../../type/post';

export type PostModalFormData = {
  title: string,
  body: string,
};

interface Props {
  post?: Post,
  onClose: () => void,
  onSubmit: (formData: PostModalFormData) => void,
  isEdit?: boolean,
}

const PostModalForm = ({
  post: initialPost,
  onClose,
  onSubmit,
  isEdit = false,
}: Props) => {
  const [title, setTitle] = useState(
    initialPost?.title || ''
  );

  const [body, setBody] = useState(
    initialPost?.body || ''
  );

  const submitBtnText = isEdit ? 'Edit Post' : 'Add Post';
  const formTitle = isEdit ? 'Edit Post' : 'Add New Post';
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({
      title,
      body,
    });
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
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={body}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}
            autoFocus
            margin="dense"
            id="body"
            label="Content"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              disabled={!title.length || !body.length}
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

export default PostModalForm;
