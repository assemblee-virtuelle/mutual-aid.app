import React from 'react';
import { useRecordContext } from 'react-admin';
import { Grid, Avatar, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { formatUsername } from '../../utils';

const useStyles = makeStyles((theme) => ({
  username: {
    fontStyle: 'italic',
  },
  note: {
    marginTop: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    [theme.breakpoints.down('xs')]: {
      width: 80,
      height: 80,
    },
  },
}));

const ProfileField = ({ label, source, ...rest }) => {
  const record = useRecordContext(rest);
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4} md={2}>
        <Avatar src={record?.['vcard:photo']} alt={record?.['vcard:given-name']} className={classes.avatar} />
      </Grid>
      <Grid item xs={8} md={10}>
        <Typography variant="h4">{record?.['vcard:given-name']}</Typography>
        <Typography variant="body2" className={classes.username}>
          {formatUsername(record?.describes)}
        </Typography>
        <Typography variant="body2" className={classes.note}>
          {record?.['vcard:note']}
        </Typography>
      </Grid>
    </Grid>
  );
};

ProfileField.defaultProps = {
  addLabel: true,
};

export default ProfileField;
