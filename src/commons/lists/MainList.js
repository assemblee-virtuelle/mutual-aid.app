import React from 'react';
import { useTranslate, getFieldLabelTranslationArgs, useShowContext } from 'react-admin';
import get from 'lodash/get';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  divider: {
    paddingTop: 5,
    paddingBottom: 20,
    borderBottom: '1px lightgrey solid',
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

const MainList = ({ children, divider, Label }) => {
  const translate = useTranslate();
  const classes = useStyles();
  const { loaded, record, resource } = useShowContext();
  if (!loaded) return null;

  return (
    <Box>
      {React.Children.map(children, (field) =>
        field && get(record, field.props.source) && React.isValidElement(field) ? (
          <div key={field.props.source} className={divider ? classes.divider : null}>
            {field.props.addLabel ? (
              <>
                <Label>
                  {translate(
                    ...getFieldLabelTranslationArgs({
                      label: field.props.label,
                      resource,
                      source: field.props.source,
                    })
                  )}
                </Label>
                {React.cloneElement(field)}
              </>
            ) : typeof field.type === 'string' ? (
              field
            ) : (
              React.cloneElement(field)
            )}
          </div>
        ) : null
      )}
    </Box>
  );
};

export default MainList;
