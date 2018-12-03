const cassandra = require('cassandra-driver');
const faker = require('faker');
// const cassandraSchema = require('./cassandraSchema.js');

// Create our client
const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1' });

const KEYSPACE_NAME = "mykeyspace"

function printError(e) {
    console.log(e.msg || e.message || e.Message || e)
}

function createKeyspace(cassClient) {
    const query = `
        CREATE KEYSPACE IF NOT EXISTS ${KEYSPACE_NAME}
        WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
    `
    return cassClient.execute(query)
}

function useKeyspace(cassClient) {
    const query = `USE ${KEYSPACE_NAME}`
    return cassClient.execute(query)
}

function createUsersTable(cassClient) {
    const query = `
        CREATE TABLE IF NOT EXISTS Description (
            productName text,
            productId int PRIMARY KEY,
            features text,
            techspecs techspecs
        );
    `
    return cassClient.execute(query)
}

function createType(cassClient) {
    const query = `
        CREATE TYPE IF NOT EXISTS techspecs (
        types text,
        description text,
        measurement boolean
        );
    `
    return cassClient.execute(query)
}

function insertBatchData(cassClient, numBatches, batchNo, batchSize) {
    const query = `INSERT INTO Description (productName, productId, features, techspecs) VALUES (?, ?, ?, ?)`

    return new Promise(function(resolve, reject) {
        if (batchNo % 200 == 0 || batchNo == 1) {
            console.log("Executing batch " + batchNo)
        }

        // generate the data for this batch
        let queryList = []
        for (currentRecord = 0; currentRecord < batchSize; currentRecord++) {
            let uniqueId = `${batchNo}/${currentRecord}`
            queryList.push({
                query,
                params: [ faker.commerce.productName(), batchSize * batchNo + currentRecord, faker.lorem.sentence(), { types: faker.lorem.word(), description: faker.lorem.sentence(), measurement: faker.random.boolean() } ]
            })
        }

        // Insert the batch into cassandra
        cassClient.batch(queryList, { prepare: true })
            .then(() => {
                // If we haven't inserted all batches yet, do the next batch
                if (batchNo < numBatches) {
                    resolve(insertBatchData(cassClient, numBatches, batchNo + 1, batchSize))
                } else {
                    resolve("done")
                }
            })
    })
}

/**
 * Kick off a recursive batch insert driven by a promise chain
 *
 * @param {} cassClient
 */
function seedData(cassClient) {
    const numBatches = 50000
    const batchSize = 200
    return insertBatchData(cassClient, numBatches, 1, batchSize)
}

console.log("Seeding Cassandra now...")
console.time("seeding")
createKeyspace(client)
    .then(() => useKeyspace(client))
    .then(() => createType(client))
    .then(() => createUsersTable(client))
    .then(() => seedData(client))
    .then(function() {
        console.log("Finished!")
        console.timeEnd("seeding")
    })
    .catch(printError)