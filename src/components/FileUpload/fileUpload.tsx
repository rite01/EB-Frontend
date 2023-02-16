/* eslint-disable @typescript-eslint/no-explicit-any */
import './fileUpload.css';

import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Container, CssBaseline, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import type { RootState } from '@/redux/Store/store';

import { handleLoading } from '../../redux/Reducer';

const StyledButton = styled(LoadingButton)`
  background-color: red;
  border: 1px red solid;
  color: #fff;
  &:hover {
    background-color: #ffff;
    color: red;
    border: 1px red solid;
  }
`;

export const FileUpload = () => {
  const [file, setFile] = React.useState<any>();
  const { showProgressBar } = useSelector((state: RootState) => state.counter);

  const [error, setError] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setError(false);
    }
  };

  const uploadFile = async (formData: FormData) => {
    dispatch(handleLoading());
    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
    };
    await fetch(`${process.env.REACT_APP_BASE_URL}csv/post`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(handleLoading());
        if (result?.status !== 200) {
          toast.error(result.message);
        } else {
          toast.success('File uploaded successfully');
        }
        setFile('');
      })
      .catch((err) => {
        dispatch(handleLoading());
        console.log('error', err);
      });
  };

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    if (!file) return setError(true);
    return uploadFile(formData);
  };
  return (
    <Box>
      <div className="d-flex align-items-center justify-content-center flex-column mt-12 container">
        <Box className="upload_container">
          <Container
            component="main"
            maxWidth="md"
            className="upload_container"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CssBaseline />
            <Box>
              <div className="image-upload">
                <label htmlFor="file-input">
                  <CloudUpload
                    sx={{
                      color: '#888888',
                      fontSize: 40,
                      cursor: 'pointer',
                      margin: '20px 0px',
                    }}
                  />
                  <Typography sx={{ fontSize: 20, color: '#888888' }}>
                    {file ? file?.name : 'Choose file to upload'}
                  </Typography>
                </label>

                <input
                  onChange={(event) => handleFileUpload(event)}
                  id="file-input"
                  type="file"
                  accept=".csv"
                />
              </div>
            </Box>
          </Container>
          {error ? (
            <div
              style={{
                color: 'red',
                fontSize: '14px',
                marginTop: '5px',
              }}
            >
              Please select a csv file
            </div>
          ) : null}
          <div className="d-flex justify-content-center">
            <StyledButton
              type="submit"
              onClick={handleFileSubmit}
              loading={showProgressBar}
              className="mt-3"
              sx={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: '100px',
                padding: '10px 22px',
                width: '22rem',
              }}
            >
              Submit
            </StyledButton>
          </div>
        </Box>
      </div>
    </Box>
  );
};
