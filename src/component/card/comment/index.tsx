import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { Comment } from '../../../type/comment';

interface Props {
  comment: Comment,
}

const CommentCard = ({
  comment,
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
    </Box>
  )
};

export default CommentCard;
