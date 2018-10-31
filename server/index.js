const express = require('express');
const bodyParser = require('body-parser');

//const = require('../database/.js');
const database = require('../database/db.js');



let app = express();

let port = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


app.get('/productdescriptions', function (req, res) {
  console.log("GET REQUEST for product descriptions");
  database.find({}, (err, data) => {
    if(err){
      console.log("ERROR:", err);
    }else{
      res.status(200).send(data);
    }
  });
  //red.end();
});