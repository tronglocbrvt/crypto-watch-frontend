import { useState } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function OpenPositionSuccess(props) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="open-position-dialog-title"
        aria-describedby="open-position-dialog-description"
      >
        <DialogTitle id="open-position-dialog-title">{"Open a synthetic position"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="open-position-dialog-description" color="white"> 
            Successfully! Your unrealized P&L is {props.unrealized_pnl}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OpenPositionSuccess;