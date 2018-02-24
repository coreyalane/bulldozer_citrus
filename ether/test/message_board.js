var MessageBoard = artifacts.require("./MessageBoard.sol");

contract('MessageBoard', function(accounts) {
  it("should initialize with default message", function() {
    return MessageBoard.deployed().then(function(instance) {
      return instance.getMessage.call();
    }).then(function(msg) {
      assert.equal(web3.toUtf8(msg), "Hello Ether.", "Test initial message.");
    });
  });
  it("should update message", function() {
    var instance_;
    return MessageBoard.deployed().then(function(instance) {
      instance_ = instance;
      return instance.updateMessage("New Message.");
    }).then(function() {
      return instance_.getMessage.call();
    }).then(function(msg) {
      assert.equal(web3.toUtf8(msg), "New Message.", "Test updated message.");
    });
  });
});
