var path = require('path');
var express = require('express');
var cors = require('cors');
var homeRoutes = require('./routes/home');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));
var server = express();     
server.set('view engine', 'ejs');
server.set('views', 'views');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, 'public')));
server.use(homeRoutes);
server.use(cors);

const port=process.env.PORT || 5000;

server.listen(port,() => {
    console.log(`Server Started on PORT ${port}`);
});