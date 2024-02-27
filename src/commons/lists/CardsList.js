import * as React from 'react';
import { useListContext, useCreatePath, Link, DateField } from 'react-admin';
import { Card, CardMedia, CardContent, Box, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 5,
  },
  details: {
    display: 'flex',
    marginBottom: 15,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  image: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundColor: theme.palette.grey['300'],
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  date: {
    width: 180,
    minWidth: 180,
    minHeight: 145,
    backgroundImage: `radial-gradient(circle at 50% 14em, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    padding: 0,
    color: 'white',
  },
  day: {
    fontSize: 50,
    lineHeight: 1.3,
  },
  content: {
    flex: '1 0 auto',
    flexShrink: 1,
    paddingTop: 10,
    paddingBottom: '16px !important',
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
}));

const CardsList = ({ CardComponent, link }) => {
  const classes = useStyles();
  const { ids, data, isLoading } = useListContext();
  const createPath = useCreatePath();

  return isLoading ? (
    <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  ) : (
    ids
      .filter((id) => data[id])
      .map((id) => {
        const image = data[id]['pair:depictedBy'];
        const resource = data[id].type.endsWith('Offer') ? 'Offer' : 'Request';
        return (
          <Link key={id} to={createPath({ resource, type: link, id })} className={classes.root}>
            <Card key={id} className={classes.details}>
              {image ? (
                <CardMedia className={classes.image} image={Array.isArray(image) ? image[0] : image} />
              ) : (
                <CardContent className={classes.date}>
                  <DateField record={data[id]} variant="subtitle1" source="dc:created" locales={process.env.REACT_APP_LANG} options={{ weekday: 'long' }} />
                  <DateField
                    record={data[id]}
                    variant="h4"
                    source="dc:created"
                    locales={process.env.REACT_APP_LANG}
                    options={{ day: 'numeric' }}
                    className={classes.day}
                  />
                  <DateField record={data[id]} variant="subtitle1" source="dc:created" locales={process.env.REACT_APP_LANG} options={{ month: 'long' }} />
                </CardContent>
              )}
              <CardContent className={classes.content}>
                <CardComponent record={data[id]} />
              </CardContent>
            </Card>
          </Link>
        );
      })
  );
};

CardsList.defaultProps = {
  link: 'show',
};

export default CardsList;
