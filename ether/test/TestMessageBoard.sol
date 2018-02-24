pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MessageBoard.sol";

contract TestMessageBoard {

  function testInitialMessageUsingDeployedContract() {
    MessageBoard messageBoard = MessageBoard(DeployedAddresses.MessageBoard());

    Assert.equal(
      messageBoard.getMessage(), "Hello Ether.", "Should have default message.");
  }

  function testInitialMessageUsingNewContract() {
    MessageBoard messageBoard = new MessageBoard();

    Assert.equal(
      messageBoard.getMessage(), "Hello Ether.", "Should have default message.");
  }

  function testUpdateMessage() {
    MessageBoard messageBoard = new MessageBoard();

    bytes32 new_msg = "New Message.";
    messageBoard.updateMessage(new_msg);

    Assert.equal(
      messageBoard.getMessage(), new_msg, "Should have new message.");
  }
}
