import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({label,action,isDisable}) {
  return (
    <Stack spacing={2} direction="row" onClick={action}>
      <Button variant="outlined" disabled={isDisable}>{label}</Button>
    </Stack>
  );
}