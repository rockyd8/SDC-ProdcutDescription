const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'mykeyspace',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const Model = models.loadSchema('Description', {
  fields:{
  productName: 'text',
  productId: 'int',
  features: ['text'],
  techSpecs: [ ({
    types: 'text',
    description: 'text',
    measurement: 'boolean'
  }, {_id:false})],
  }
  key: ['productId']
});
