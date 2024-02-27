import React from 'react';
import { SelectField, DateField } from 'react-admin';
import IconsList from '../commons/lists/IconsList';
import EventIcon from '@mui/icons-material/Event';
import NaturePeopleOutlinedIcon from '@mui/icons-material/NaturePeopleOutlined';
import SyncIcon from '@mui/icons-material/Sync';
import { types, resourceTypes } from '../config/constants';

const Details = (props) => {
  return (
    <IconsList {...props}>
      <SelectField
        source="type"
        label="app.input.exchange_type"
        choices={Object.entries(types).map(([k, v]) => ({ id: k, name: v }))}
        icon={<SyncIcon />}
      />
      <SelectField
        source="mp:offerOfResourceType"
        label="app.input.resource_type"
        choices={Object.entries(resourceTypes).map(([k, v]) => ({ id: k, name: v }))}
        icon={<NaturePeopleOutlinedIcon />}
      />
      <DateField
        source="dc:created"
        locales={process.env.REACT_APP_LANG}
        options={{ year: 'numeric', month: 'long', day: 'numeric' }}
        icon={<EventIcon />}
      />
    </IconsList>
  );
};

export default Details;
