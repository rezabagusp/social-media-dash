import React from 'react'

import Snackbar from '@mui/material/Snackbar';

interface Props {
  open: boolean
  autohide?: boolean
  onClose: () => void
  message: string
}

function SnackBardCustom({ open, onClose, message = 'Something went wrong!', autohide = true }: Props) {
  return (
    <Snackbar
      autoHideDuration={autohide ? 5000 : null}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={onClose}
      message={message}
    />
  )
}

export default SnackBardCustom
