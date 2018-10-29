const express = require('express');
const bodyParser = require('body-parser');

const getRepo = require('../helpers/github.js');
const database = require('./database/index.js');



let app = express();

let port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


app.get('/productdescriptions', function (req, res) {


  red.end();
});