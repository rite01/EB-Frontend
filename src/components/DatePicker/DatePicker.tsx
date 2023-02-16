import { FormControl } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import type { Dayjs } from 'dayjs';
import type { FormikValues } from 'formik';
import { useFormikContext } from 'formik';
import React from 'react';

interface Iprops extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  field: FormikValues;
  error: boolean;
}

export const BasicDatePicker = ({ label, field, error }: Iprops) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const { setFieldValue } = useFormikContext<FormikValues>();
  const handleChange = (newValue: React.SetStateAction<Dayjs | null>) => {
    setValue(newValue);

    setFieldValue(field.name, newValue);
  };
  return (
    <FormControl sx={{ width: 300, mt: 3 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(newValue: React.SetStateAction<Dayjs | null>) =>
            handleChange(newValue)
          }
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} error={error} />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};
