/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, Paper } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import type { IPost } from '@/interfaces';

import { handleData, handleTableActions } from '../../redux/Reducer';

interface IProps {
  employeeData: any;
}

export const CustomTable = ({ employeeData }: IProps) => {
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();

  const handleClick = (employee: IPost, action: string) => {
    dispatch(handleTableActions(action));
    dispatch(handleData(employee));
  };
  // const handleChangePage = (_event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  React.useEffect(() => {}, [employeeData?.length]);
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <div className="table-responsive">
          <table className="table caption-top">
            <thead style={{ background: 'black', color: 'white' }}>
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Name </th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">DOB</th>
                <th scope="col">Branch</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeData?.map((employee: any) => {
                return (
                  <tr key={employee?.id}>
                    <th scope="row">{employee?.id}</th>
                    <td>{employee?.name}</td>
                    <td>{employee?.email}</td>
                    <td>React JS</td>
                    <td>@mdo</td>
                    <td>Annapurna</td>
                    <td>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleClick(employee, 'edit')}
                      >
                        <EditTwoToneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleClick(employee, 'delete')}
                      >
                        <DeleteTwoToneIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </div>
      </TableContainer>
    </Paper>
  );
};
