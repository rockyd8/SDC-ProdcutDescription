require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const = require('../database/.js');
const database = require('../database/db.js');
const normalizePort = require('normalize-port');
const { Pool } = require('pg')

const client = new Pool({
    user: "RockysMac",
    password: "password",
    database: "mydatabase"
})

var port = normalizePort(process.env.PORT || '8081');

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/../client/dist`, { maxAge: '365d' }));


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

function getSingleId(req, res, next) {

  client.connect().then((pgClient) => {
  var productId = req.params.productId;
  console.log(`GET REQUEST for product Id ${productId}`);
  pgClient.query('select * from description where productId = $1',
    [productId])
    .then(function (data) {
      pgClient.release()
      res.status(200)
        .json({ productName: data.rows[0].productname,
                productId: data.rows[0].productid,
                features: [data.rows[0].features],
                techSpecs: [{ types: data.rows[0].types,
                              description: data.rows[0].description,
                              measurement: data.rows[0].measurement}]});
    })
    .catch(function (err) {
      pgClient.release()
      return next(err);
    });
  })
}

app.get('/product/data/:productId', getSingleId);

// app.get('/productdescriptions', function (req, res) {
//   console.log("GET REQUEST for product descriptions");
//   database.find({}, (err, data) => {
//     if(err){
//       console.log("ERROR:", err);
//     }else{
//       res.status(200).send(data);
//     }
//   });
// });

app.get('/product/:productId', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});


// app.get('/product/data/:productId', function (req, res) {
//   var productId = req.params.productId;
//   console.log(`GET REQUEST for product Id ${productId}`);
//   database.findOne({productId: productId}, (err, productData) => {
//     if(err){
//       console.log("ERROR:", err);
//     }else{
//       console.log("GOT DATA");
//       //console.log(productData);
//       res.status(200).send(productData);
//     }
//   });
// });