import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const NotFound = () => (
  <Box sx={{
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Typography variant="h1">404</Typography>
    <br />
    <Typography variant="body1">Page Not Found</Typography>
  </Box>
)

export default NotFound
