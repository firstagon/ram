import { SyntheticEvent, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface SearchProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (payload?: string) => void;
}

const SearchInput = ({ input, setInput, onSubmit }: SearchProps) => {
  
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input) {
        const searchName = input.trim();
        onSubmit(searchName);
      } else onSubmit();
    }, 300);
    return () => clearTimeout(debounce);
  }, [input]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const submitHandler = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (input) {
      const searchName = input.trim();
      onSubmit(searchName);
    }
  };

  const clearHandler = () => {
    if (!input) return;
    setInput('');
    onSubmit();
  };

  return (
    <>
      <Box
        onSubmit={submitHandler}
        component="form"
        display="flex"
        alignItems="center"
        justifyContent={'center'}
        width={'100%'}
        gap={4}
        my={4}
      >
        <TextField
          value={input}
          onChange={changeHandler}
          sx={{ width: '50%' }}
          id="name"
          label="Find character by name"
        />
        <Button type="reset" sx={{ position: 'abolute', right: 1 }} onClick={clearHandler} variant="outlined">
            clear
          </Button>
      </Box>
    </>
  );
};

export default SearchInput;