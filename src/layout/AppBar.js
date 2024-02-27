import React from 'react';
import { useTranslate } from 'react-admin';
import {
  Typography,
  Container,
  IconButton,
  Box,
  Grid,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import AppIcon from '../config/AppIcon';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
    '& svg': {
      fontSize: '4rem',
    },
  },
  beta: {
    top: 2,
  },
  title: {
    fontSize: 48,
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 4,
    '& a': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  buttons: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
  button: {
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 16,
    },
  },
}));

const AppBar = ({ title }) => {
  const classes = useStyles();
  const translate = useTranslate();
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box mb={1} className={classes.box}>
            <Link to="/offers">
              <IconButton edge="start" className={classes.menuButton} color="inherit">
                <AppIcon fontSize="large" />
              </IconButton>
            </Link>
            <Typography variant="h4" className={classes.title}>
              <Link to="/offers">
                {title}
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box className={classes.buttons} mt={{ xs: 0, sm: 4 }}>
            <Link to="/post">
              <Button variant="contained" className={classes.button}>
                {translate('app.action.create_ad')}
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppBar;
