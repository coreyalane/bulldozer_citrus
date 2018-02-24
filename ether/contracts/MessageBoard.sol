pragma solidity ^0.4.4;

contract MessageBoard {
	bytes32 message_;

	event MessageUpdated(bytes32 indexed _new_message);

	function MessageBoard() {
		message_ = "Hello Ether.";
	}

	function getMessage() returns(bytes32 output) {
		return message_;
	}

	function updateMessage(bytes32 new_message) {
		message_ = new_message;
		MessageUpdated(message_);
	}
}
