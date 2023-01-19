import { dataProvider } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import dataServers from './dataServers';
import dataModels from './dataModels';

export default dataProvider({
  dataServers,
  resources: dataModels,
  ontologies,
  jsonContext: process.env.REACT_APP_COMMON_DATA_URL + 'context.json',
  returnFailedResources: true,
});
