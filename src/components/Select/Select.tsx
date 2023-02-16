/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import type { Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { FormikValues } from 'formik';
import { useFormikContext } from 'formik';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IProps {
  menu: any;
  placeholder: string;
  field: FormikValues;
  error: boolean;
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CustomSelect = ({ placeholder, menu, field, error }: IProps) => {
  const theme = useTheme();
  const { setFieldValue } = useFormikContext<FormikValues>();

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setFieldValue(field.name, value);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 300, mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{placeholder}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          error={error}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>
          {menu.map((item: any) => (
            <MenuItem
              key={item?.id}
              value={item?.name || item?.landmark}
              style={getStyles(item?.name, personName, theme)}
            >
              {item?.name || item?.landmark}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
