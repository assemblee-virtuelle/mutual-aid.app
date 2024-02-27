import React from 'react';
import { useEditContext, Link, Button, useTranslate, useCreatePath } from 'react-admin';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ShowButton = () => {
  const { record, resource } = useEditContext();
  const translate = useTranslate();
  const createPath = useCreatePath();
  return (
    <Link to={createPath({ resource, type: 'show', id: record?.id })}>
      <Button label={translate('ra.action.show')}>
        <VisibilityIcon />
      </Button>
    </Link>
  );
};

export default ShowButton;
