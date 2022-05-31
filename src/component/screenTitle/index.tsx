import { ReactNode } from 'react';
import { Typography } from '@mui/material';

interface Props {
  title?: ReactNode,
}

const ScreenTitle = ({
  title,
}: Props) => {
  return (
    <Typography variant="h5" borderBottom="2px solid" width="max-content">
      {title}
    </Typography>
  );
};

export default ScreenTitle;
