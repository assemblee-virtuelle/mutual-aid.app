import React from 'react';
import { useEditContext, Toolbar, SaveButton } from 'react-admin';
import { Container, Typography, Card, Box, Grid, useMediaQuery } from '@mui/material';

const NoDeleteToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const EditPage = ({ undoable, mutationMode, title, actions, className, hasDelete = true, children, ...rest }) => {
  const {
    defaultTitle,
    // hasList,
    // hasShow,
    record,
    redirect,
    resource,
    save,
    saving,
    version,
  } = useEditContext(rest);
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });

  if (!record) return null;

  return (
    <Container maxWidth="md">
      <Card>
        <Box p={3}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h2">
                {React.isValidElement(title) ? React.cloneElement(title, { record }) : title || defaultTitle}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="flex-end" alignItems="flex-end" flexDirection={xs ? 'column' : 'row'}>
                {actions}
              </Box>
            </Grid>
          </Grid>
          {React.cloneElement(React.Children.only(children), {
            resource,
            record,
            saving,
            save,
            undoable,
            mutationMode,
            version,
            redirect,
            component: 'div',
            toolbar: hasDelete ? undefined : <NoDeleteToolbar />,
          })}
        </Box>
      </Card>
    </Container>
  );
};

export default EditPage;
