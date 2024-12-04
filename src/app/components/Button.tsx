import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./styles.scss";

interface ButtonProps {
  label: string;
  action: ()=>{} | void;
  isDisable: boolean;
  variant: string;
  size: string;
}

export default function BasicButtons({label,action,isDisable, variant="outlined", size="medium"}: ButtonProps) {
  return (
    <Stack spacing={2} direction="row" onClick={action} className="button-wrapper">
      <Button variant={variant} disabled={isDisable} size={size}>{label}</Button>
    </Stack>
  );
}