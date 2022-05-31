import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import type { Comment } from '../../../type/comment';

interface Props {
  comment: Comment,
  onClickEdit: () => void,
  onClickDelete: () => void,
}

const CommentCard = ({
  comment,
  onClickEdit,
  onClickDelete,
}: Props) => {
  const { email, body } = comment;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderRadius: '8px',
        padding: '8px 0',
      }}
    >
      <Box px="16px">
        <Typography variant="body1">
          {email}
        </Typography>
      </Box>
      <hr />
      <Box px="16px">
        <Typography variant="body2">
          {body}
        </Typography>
      </Box>

      <Box px="16px" mt="16px">
        <Grid container spacing={2}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={onClickEdit}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={onClickDelete}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
};

export default CommentCard;
