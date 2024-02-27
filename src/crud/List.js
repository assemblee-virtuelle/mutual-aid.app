import React, { useMemo } from 'react';
import { Box, Typography, Container, Card as MuiCard } from '@mui/material';
import { ListBase, useTranslate } from 'react-admin';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import CardsList from '../commons/lists/CardsList';
import OfferCard from '../commons/cards/OfferCard';

const List = () => {
  useCheckAuthenticated();
  const translate = useTranslate();

  const sparqlWhere = useMemo(() => {
    const now = new Date();
    return [
      {
        type: 'optional',
        patterns: [
          {
            type: 'bgp',
            triples: [
              {
                subject: { termType: 'Variable', value: 's1' },
                predicate: {
                  termType: 'NameNode',
                  value: 'http://virtual-assembly.org/ontologies/pair-mp#hasTimeCondition',
                },
                object: { termType: 'Variable', value: 'hasTimeCondition' },
              },
              {
                subject: { termType: 'Variable', value: 'hasTimeCondition' },
                predicate: {
                  termType: 'NameNode',
                  value: 'http://virtual-assembly.org/ontologies/pair-mp#expirationDate',
                },
                object: { termType: 'Variable', value: 'expirationDate' },
              },
            ],
          },
        ],
      },
      {
        type: 'filter',
        expression: {
          type: 'operation',
          operator: '||',
          args: [
            {
              type: 'operation',
              operator: '!',
              args: [
                {
                  type: 'operation',
                  operator: 'bound',
                  args: [
                    {
                      termType: 'Variable',
                      value: 'expirationDate',
                    },
                  ],
                },
              ],
            },
            {
              type: 'operation',
              operator: '>',
              args: [
                {
                  termType: 'Variable',
                  value: 'expirationDate',
                },
                {
                  termType: 'Literal',
                  datatype: {
                    termType: 'NamedNode',
                    value: 'http://www.w3.org/2001/XMLSchema#dateTime',
                  },
                  value: now.toISOString(),
                },
              ],
            },
          ],
        },
      },
    ];
  }, []);

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <MuiCard>
          <Box p={2}>
            <Typography variant="h5">{translate('app.block.welcome', { app_name: process.env.REACT_APP_NAME })}</Typography>
            <Typography variant="body1">{translate('app.block.welcome_text', { app_name: process.env.REACT_APP_NAME })}</Typography>
          </Box>
        </MuiCard>
      </Box>
      <ListBase
        resource="OfferAndRequest"
        perPage={1000}
        sort={{ field: 'dc:created', order: 'DESC' }}
        filter={{ sparqlWhere }}
      >
        <CardsList CardComponent={OfferCard} link="show" />
      </ListBase>
    </Container>
  );
};

export default List;
