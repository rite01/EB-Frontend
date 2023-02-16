import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import type { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/redux/Store/store';

import { handleTableActions } from '../../redux/Reducer';
import { Registration } from '../Registration';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomDialog = () => {
  const isOpen = useSelector(
    (state: RootState) => state.counter.isEditModelOpen,
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleTableActions('edit'));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: 'relative', color: 'white', background: 'black' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Employee Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Registration />
        </Box>
      </Dialog>
    </div>
  );
};
