import { ReactNode } from "react";
import Box from '@mui/material/Box';

interface Props {
  children: ReactNode,
}

const AppLayout = ({
  children,
}: Props) => {
  return (
    <>
      <Box
        component="header"
        sx={{
          bgcolor: "primary.main",
          height: "54px",
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          color: "#ffffff",
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          Social Media Dashboard
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
