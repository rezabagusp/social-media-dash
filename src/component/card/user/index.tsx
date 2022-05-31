import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import { User } from "../../../type/user";

interface Props {
  user: User,
  withAction?: boolean,
}

const UserCard = ({
  user,
  withAction = true,
}: Props) => {
  const {
    name,
    username,
    email,
    id: userId
  } = user;

  return (
    <Box
      sx={{
        border: '1px solid',
        borderRadius: '4px',
        padding: '8px 16px'
      }}
    >
      <Typography variant="body2">
        Name:&nbsp;
        {name}
      </Typography>
      <Typography variant="body2">
        Username:&nbsp;
        {username}
      </Typography>
      <Typography variant="body2">
        Email:&nbsp;
        {email}
      </Typography>
      {
        withAction && (
          <Box mt="20px">
            <Grid container spacing={2}>
              <Grid item>
                <Box sx={{ 'a': { textDecoration: 'none'}}}>
                  <Link to={`/users/${userId}/posts`}>
                    <Button size="small"  variant="contained">
                      See Posts
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ 'a': { textDecoration: 'none'}}}>
                  <Link to={`/users/${userId}/albums`}>
                    <Button size="small"  variant="contained">
                      See Albums
                    </Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      }
    </Box>
  );
};

export default UserCard;
