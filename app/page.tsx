'use client';

import { Box, Button, Typography } from '@mui/material';

export default function Home() {
  return (
    <div>
      <main>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Typography variant='h1'>Practice Claude Code</Typography>
        </Box>
      </main>
    </div>
  );
}
