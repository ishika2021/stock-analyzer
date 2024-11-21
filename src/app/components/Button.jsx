import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons({label,action,isDisable, variant="outlined", size="medium"}) {
  return (
    <Stack spacing={2} direction="row" onClick={action}>
      <Button variant={variant} disabled={isDisable} size={size}>{label}</Button>
    </Stack>
  );
}