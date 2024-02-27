import React from 'react';
import { useShowContext } from 'react-admin';
import { Container, Typography, Card, Box, Grid, useMediaQuery } from '@mui/material';
import IntegratedImageField from '../commons/fields/IntegratedImageField';

const ShowPage = ({ title, defaultTitle, details, actions, children, ...rest }) => {
  const showContext = useShowContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  return (
    <Container maxWidth="md">
      <Card>
        <Box p={{ xs: 2, md: 3 }}>
          <Grid container>
            <Grid item xs={10} sm={8}>
              <Typography variant="h2">
                {React.isValidElement(title)
                  ? React.cloneElement(title, { record: showContext.record })
                  : title || showContext.defaultTitle}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" flexDirection={xs ? 'column' : 'row'}>
                {actions}
              </Box>
            </Grid>
          </Grid>
          <IntegratedImageField source="pair:depictedBy" title="pair:label" />
          <Box display={xs ? 'block' : 'flex'} pt={2} pb={2}>
            {React.cloneElement(details, { orientation: xs ? 'vertical' : 'horizontal' })}
          </Box>
          {React.cloneElement(children, { ...showContext, component: 'div' })}
        </Box>
      </Card>
    </Container>
  );
};

export default ShowPage;
