import { memo } from 'react';

import { Button } from '@mui/material';

const ButtonClear = ({ clearHandler }: { clearHandler: () => void }) => {
  return (
    <Button onClick={clearHandler} type="reset" sx={{ position: 'abolute', right: 1 }}  variant="outlined">
      clear
    </Button>
  );
};

export default memo(ButtonClear);