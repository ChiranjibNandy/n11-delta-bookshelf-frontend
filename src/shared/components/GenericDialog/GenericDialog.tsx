import CloseIcon from "@mui/icons-material/Close";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import styles from "./GenericDialog.module.scss";
import {GenericDialogProps} from "./GenericDialogProps";

const StyledDialog = styled(Dialog)(({theme}) => ({
  "& .MuiPaper-root": {
    flexDirection: "row",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id?: string;
  onClose: () => void;
}

const DialogHeader = (props) => {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const GenericDialog = (props: GenericDialogProps) => {
  const handleClose = () => {
    props.onDialogClose();
  };

  return (
    <StyledDialog onClose={handleClose} open={props.open}>
      <img src={props.image} className={styles.image} alt={props.title} />

      <div className={styles.dialog}>
        <DialogHeader id="title" className={styles.title} onClose={handleClose}>
          {props.title}
        </DialogHeader>
        <DialogContent className={styles.content}>
          {props.children}
        </DialogContent>
      </div>
    </StyledDialog>
  );
};