import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  title?: ReactNode,
  content?: ReactNode,
  onClose: () => void,
  onSubmit: () => void,
}

const ConfirmationDialog = ({
  title = "Are You Sure?",
  content,
  onClose,
  onSubmit,
}: Props) =>{ 
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      {
        content && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
        )
      }
      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

