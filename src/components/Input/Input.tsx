/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { FieldProps } from 'formik';
import type { FC } from 'react';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  showIcon?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  variant?: 'standard' | 'filled' | 'outlined';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  error: boolean;
}
const StyledInput = styled(TextField)`
  border-radius: 0px;
`;
export const CustomInput: FC<InputProps & FieldProps> = ({
  label,
  type,
  className,
  variant,
  showIcon,
  field,
  showPassword,
  setShowPassword,
  error,
}) => {
  const [isPassword, setIsPassword] = React.useState<boolean>(false);
  const handleClickShowPassword = () => {
    if (setShowPassword) {
      setIsPassword(!isPassword);
      setShowPassword(!showPassword);
    }
  };
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <>
      <StyledInput
        label={label}
        type={isPassword ? 'text' : type}
        fullWidth
        variant={variant}
        error={error}
        InputProps={{
          endAdornment: showIcon && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        autoComplete="off"
        className={className}
        size="medium"
        margin="normal"
        {...field}
      />
    </>
  );
};
