pragma solidity ^0.4.17;

contract Fund {
    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    function Fund(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
}