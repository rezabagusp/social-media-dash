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
          color: "#ffffff"
        }}
      >
        Social Media Dashboard
      </Box>
      <main>
        {children}
      </main>
    </>
  );
};

export default AppLayout;
