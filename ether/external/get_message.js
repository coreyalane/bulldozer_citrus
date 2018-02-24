var MessageBoard = artifacts.require("./MessageBoard.sol");

module.exports = function(callback) {
  MessageBoard.deployed().then(function(instance) {
    return instance.getMessage.call();
  }).then(function(msg) {
    console.log(web3.toUtf8(msg));
  });
}
