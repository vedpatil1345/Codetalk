const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'codetalk-0.0.2',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

