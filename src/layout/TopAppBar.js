import React from 'react';
import { useGetIdentity } from 'react-admin';
import { Typography, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import UserMenu from './UserMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#585858',
    boxShadow: 'unset',
  },
  menuButton: {
    color: 'white',
  },
  toolbar: {
    minHeight: '36px',
  },
  title: {
    flexGrow: 1,
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
}));

const TopAppBar = ({ logout }) => {
  const classes = useStyles();
  const { identity } = useGetIdentity();
  const domainName = identity?.id && (new URL(identity?.id)).hostname;
  return (
    <MuiAppBar position="static" className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Typography variant="caption" className={classes.title}>
          {domainName}
        </Typography>
        <UserMenu logout={logout} />
      </Toolbar>
    </MuiAppBar>
  );
};

export default TopAppBar;
