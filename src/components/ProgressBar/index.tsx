import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';

export default function LinearIndeterminate() {
  return (
    <Box sx={{ width: '100%' }} className="spinner">
      <LinearProgress color="secondary" />
    </Box>
  );
}
