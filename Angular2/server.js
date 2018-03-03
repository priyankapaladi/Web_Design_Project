const express = require('express');
var cors = require('cors');
const app = express();
const router = express.Router();

var morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
var bodyParser = require('body-parser');
//var appRoutes = require('./app/routes/api')(router);
const path = require('path');
const authentication = require('./routes/authentication')(router);

//app.use(morgan('dev')); // to log all requests

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/blogApp/dist/'));
app.use('/authentication', authentication); // frontend file access
//app.use('/api',appRoutes); // has to come after pasrsing the request. So the order matters
// /api - just to differenciate backend and frontend routes
mongoose.Promise = global.Promise; // config issue
mongoose.connect(config.uri, function (err) {
  if (err) {
    console.log('Not connected to the database!' + err);
  }else{
    console.log('Successfully connected to database:' + config.db);
  }
})


app.get('*',function(req, res){
  res.sendFile(path.join(__dirname + '/blogApp/dist/index.html'));
});

//use 8080 or if environment has specific server to point to
app.listen(process.env.PORT || 8080, function() {
  console.log("Running the server on port 8080!");
});
