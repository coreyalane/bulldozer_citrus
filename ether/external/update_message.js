var MessageBoard = artifacts.require("./MessageBoard.sol");

module.exports = function(callback) {
  MessageBoard.deployed().then(function(instance) {
    return instance.updateMessage("The updated message.");
  })
}
