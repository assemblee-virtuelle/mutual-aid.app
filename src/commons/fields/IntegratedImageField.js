import React from 'react';
import { Modal, Fade, Backdrop } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRecordContext } from 'react-admin';

const useStyles = makeStyles((theme) => ({
  image: {
    marginTop: 16,
    marginLeft: 24,
    marginBottom: 24,
    maxWidth: '330px',
    maxHeight: '330px',
    float: 'right',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginBottom: 0,
      float: 'unset',
      maxWidth: '100%',
      maxHeight: 'unset',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundcolor: 'red',
    },
  },
  fade: {
    outline: 'none',
  },
}));

const IntegratedImageField = ({ source, title, ...rest }) => {
  const classes = useStyles();
  const record = useRecordContext();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <img
        src={record?.[source]}
        title={record?.[title]}
        alt=""
        className={classes.image}
        onClick={() => setOpen(true)}
        {...rest}
      />
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} timeout={500} className={classes.fade}>
          <img src={record?.[source]} style={{ maxHeight: '90%', maxWidth: '90%' }} alt="" />
        </Fade>
      </Modal>
    </>
  );
};

export default IntegratedImageField;
