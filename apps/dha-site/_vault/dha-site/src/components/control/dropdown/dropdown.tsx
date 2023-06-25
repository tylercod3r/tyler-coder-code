import './dropdown.sass';

import { useState, useEffect } from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  label: string;
  items: string[];
  defaultOption: string;
  selectHandler(value: string): void;
  disable: boolean;
}

const Dropdown = ({
  label,
  items,
  defaultOption,
  selectHandler,
  disable,
}: Props): JSX.Element => {
  const [options, setOptions] = useState<string[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>(items[0]);

  const handleSelect = (e: any) => {
    setOptionSelected(e.target.value);

    selectHandler(e.target.value);
  };

  useEffect(() => {
    if (items) {
      // insert "any" option
      const newOptions = [defaultOption].concat(items);

      // convert to lowercase
      const options = newOptions.map((option) => option.toLocaleLowerCase());

      setOptions(options);
      setOptionSelected(options[0]);
    }
  }, [items]);

  return (
    <FormControl fullWidth className="dropdown-form-control">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={optionSelected}
        label={label}
        onChange={handleSelect}
        disabled={disable}
        // multiple
      >
        {options?.map((data, index) => (
          <MenuItem key={index} value={data}>
            {' '}
            {data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
