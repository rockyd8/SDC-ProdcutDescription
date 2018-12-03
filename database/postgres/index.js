const faker = require('faker')
const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const recordsToInsert = 10000000
// const recordsToInsert = 1000
const batchSize = recordsToInsert * 0.1
const numBatches = 10
const recordsPerBatch = recordsToInsert / numBatches
console.log(recordsPerBatch);
const client = new Client({
    user: "RockysMac",
    password: "password",
    database: "mydatabase"
})

function printError(e) {
    console.log(e.msg || e.message || e.Message || e)
}

function createTables(pgClient) {
    const query = `
        CREATE TABLE IF NOT EXISTS Description (
            productId SERIAL PRIMARY KEY,
            productName TEXT NOT NULL,
            features TEXT NOT NULL,
            types TEXT NOT NULL,
            description TEXT NOT NULL,
            measurement BOOLEAN NOT NULL
        );
    `
    return pgClient.query(query)
}

function openSeedDataFile(fileName) {
    return new Promise(function(resolve, reject){
        let wstream = fs.createWriteStream(fileName)
        wstream.on("open", function() {
            resolve(wstream)
        })
    })
}

async function generateSeedData(seedFileFullPath, recordsToInsert, notificationMod) {
    console.log("No seed data found. Generating it.")
    let wstream = await openSeedDataFile(seedFileFullPath)
    wstream.write("productName, features, types, description, measurement\n")
    for(recordId = 1; recordId <= recordsPerBatch; recordId++) {
        // if (recordId % notificationMod == 0 || recordId == 1) {
        //     console.log(`Generating record #${recordId}`)
        // }
        let values = [
            faker.commerce.productName(),
            faker.lorem.sentence(),
            faker.lorem.word(),
            faker.lorem.sentence(),
            faker.random.boolean()
        ]
        wstream.write(values.join(",") + "\n")
    }
    await closeFile(wstream)
    console.log("Finished generating seed data.")
}

/**
 * Kick off a recursive batch insert driven by a promise chain
 *
 * @param {} pgClient
 */
async function seedData(pgClient) {
    const notificationMod = recordsToInsert * 0.05

    const seedFileFullPath = path.resolve("./pgseeddata.csv")

    for (i = 1; i <= numBatches; i++) {
        console.log(`Inserting seed data for batch ${i}`)
        if (fs.existsSync(seedFileFullPath)) {
            fs.unlinkSync(seedFileFullPath)
        }

        await generateSeedData(seedFileFullPath, recordsToInsert, notificationMod)

        await pgClient.query(`
            COPY description(productName, features, types, description, measurement)
            FROM '${seedFileFullPath}' WITH DELIMITER AS ',' CSV HEADER;`
        )
    }

    // for(recordId = 1; recordId <= recordsToInsert; recordId++) {
    //     if (recordId % notificationMod == 0 || recordId == 1) {
    //         console.log(`Inserting record #${recordId}`)
    //     }
    //     let values = [
    //         faker.commerce.productName(),
    //         faker.lorem.sentence(),
    //         faker.lorem.word(),
    //         faker.lorem.sentence(),
    //         faker.random.boolean()
    //     ]
    //     await pgClient.query(insertQuery, values)
    // }
}

function closeFile(wstream) {
    return new Promise(function(resolve, reject){
        wstream.on("close", function() {
            resolve(wstream)
        })
        wstream.end()
    })
}

async function startApp() {
    await client.connect()
    console.log("Seeding pg now...")
    console.time("seeding")
    createTables(client)
        .then(() => seedData(client))
        .then(function() {
            console.log("Finished!")
            console.timeEnd("seeding")
        })
    .catch(printError)
}

startApp()
    .catch(printError)