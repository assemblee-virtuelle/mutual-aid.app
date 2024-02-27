import React from 'react';
import { Box } from '@mui/material';
import { Alert } from '@mui/material';
import { MapField } from '@semapps/geo-components';
import { ReferenceField } from '@semapps/field-components';
import { useRecordContext } from 'react-admin';

const LocationField = ({ label, source, ...rest }) => {
  const record = useRecordContext(rest);
  return (
    <ReferenceField reference="Location" record={record} source={source} link={false}>
      <MapField
        address={(record) => (
          <>
            {record?.['vcard:given-name'] + ', ' + record?.['vcard:hasAddress']?.['vcard:given-name']}
            {record?.['vcard:note'] && (
              <Box mb={2} mt={2}>
                <Alert severity="info">
                  <strong>Note</strong>: {record?.['vcard:note']}
                </Alert>
              </Box>
            )}
          </>
        )}
        latitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:latitude']}
        longitude={(record) => record?.['vcard:hasAddress']?.['vcard:hasGeo']?.['vcard:longitude']}
        height={250}
      />
    </ReferenceField>
  );
};

LocationField.defaultProps = {
  addLabel: true,
};

export default LocationField;
