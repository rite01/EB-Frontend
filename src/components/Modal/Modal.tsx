/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import type { RootState } from '@/redux/Store/store';

import { handlePageLoad, handleTableActions } from '../../redux/Reducer';
import { deleteUser } from '../../services';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CustomModal = () => {
  const dispatch = useDispatch();
  const deleteData = useSelector((state: RootState) => state.counter.editData);

  const isOpen = useSelector(
    (state: RootState) => state.counter.isDeleteModalOpen,
  );

  const handleClose = () => {
    dispatch(handleTableActions('delete'));
  };

  const handleDelete = async () => {
    const result = await deleteUser(deleteData?.id);
    if (result?.data === 1) {
      toast.success(`${deleteData?.name} deleted successfully`);
    } else {
      toast.error(result?.message);
    }
    dispatch(handlePageLoad());
    handleClose();
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {'Are you sure you want to delete this employee record?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete()}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
