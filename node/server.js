'use strict';

const express = require('express');
var mongoose = require('mongoose'),
    Web3        = require('web3'),
    contract    = require("truffle-contract"),
    path        = require('path'),
    MessageBoard = require(path.join(__dirname, '../helloether/build/contracts/MessageBoard.json'));

// Setup MongoDB
var mongoDB = 'mongodb://35.192.100.161:27017/show';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var TestMessagesSchema = new Schema({
    test_key: String,
    test_value: String
});
var TestMessagesModel = mongoose.model('TestMessages', TestMessagesSchema );

// Setup Web3
var provider    = new Web3.providers.HttpProvider("http://localhost:7545"),    
    web3        = new Web3(provider),
    filePath    = path.join(__dirname, '../helloether/build/contracts/MessageBoard.json');
var MessageBoardContract = contract(MessageBoard);
MessageBoardContract.setProvider(provider);

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/write/:key/:value', (req, res) => {
  var msg_instance = new TestMessagesModel({
    test_key: req.params.key,
    test_value: req.params.value
  });
  msg_instance.save(function (err) {
    if (err) {
      console.log('Write error.');
    }
  });
  res.send(req.params);
});

app.get('/show', (req, res) => {
  TestMessagesModel.find({}, function (err, data) {
    var output_str = '';
    for (var i = 0; i < data.length; i++) {
      output_str += data[i].test_key + ' :  ' + data[i].test_value + '\n'
    } 
    res.send(output_str);
  });
});

app.get('/destroy', (req, res) => {
  TestMessagesModel.remove({}, (err) => {
    if (err) res.send('Remove error.');
    res.send('Data removed.');
  });
});

app.get('/get_message', (req, res) => {
  MessageBoardContract.deployed().then(function(instance) {
    return instance.getMessage.call();
  }).then(function(msg) {
    var msg_utf8 = web3.toUtf8(msg); 
    console.log(msg_utf8);
    //res.send(web3.eth.accounts);
    res.send(msg_utf8);
  }, function(error) {
    console.log(error);
    res.send(error);
  });
});

app.get('/update_message/:msg', (req, res) => {
  console.log('in update_message/');
  var instance_; 
  return MessageBoardContract.deployed().then(function(instance) { 
    instance_ = instance; 
    return instance.updateMessage(req.params.msg, {from: web3.eth.accounts[1]}); 
  }).then(function() { 
    return instance_.getMessage.call(); 
  }).then(function(msg) { 
    res.send(web3.toUtf8(msg));
  }); 
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
