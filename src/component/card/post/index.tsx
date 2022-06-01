import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import { Post } from "../../../type/post";

interface Props {
  post: Post,
  userId: number,
  onClickEdit?: () => void,
  onClickDelete: () => void, 
}

const PostCzrd = ({
  post,
  userId,
  onClickEdit,
  onClickDelete,
}: Props) => {
  const {
    title,
    body,
  } = post;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderRadius: '4px',
        'a': { textDecoration: 'none', color: 'inherit'},
      }}
    >
        <Link to={`/users/${userId}/posts/${post.id}`}>
          <Box sx={{
            padding: '8px 16px',
          }}>
          <Typography variant="body1">
            {title}
          </Typography>
          <Typography variant="body2">
            {body}
          </Typography>
        </Box>
      </Link>
      <Box px="16px" my="16px">
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
  );
};

export default PostCzrd;
