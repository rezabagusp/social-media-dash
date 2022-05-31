import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { Post } from "../../../type/post";

interface Props {
  post: Post,
  userId: number,
  withAction?: boolean,
}

const PostCzrd = ({
  post,
  userId,
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
    </Box>
  );
};

export default PostCzrd;
