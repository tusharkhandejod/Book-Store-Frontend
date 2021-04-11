import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from '@material-ui/core/Button';

export default function SnackBar(props) {
    const [snackbaropen, setSnackbaropen] = React.useState(false);
    const [open, setOpen] = React.useState("");

  const snackbarClose = () => {
    setSnackbaropen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  return (
    
      <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      autoHideDuration={3000}
      onClose={snackbarClose}
      message={props.message}
      action={
        <Button onClick={handleClose}  color="inherit" size="small">
          close
        </Button>
      }
      />

  )
}