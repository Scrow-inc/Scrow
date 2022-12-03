// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// initialize escrow contract
contract Escrow is ReentrancyGuard {

    // declaration of variables
    address public companyAcc;
    uint256 public companyBal;
    uint256 public companyProfit;
    uint256 public paymentFees;
    uint256 public totalAgg = 0;
    uint256 public totalConfirmedAgg = 0;
    uint256 public totalDisputed = 0;

    // declaration of enums
    enum Status {
        OPEN,
        PENDING,
        DELIVERY,
        CONFIRMED,
        DISPUTTED,
        REFUNDED,
        WITHDRAWED
    }

    enum Available {
        NO,
        YES
    }

    // declaration  of structs
    struct AggrementStruct {
        uint256 id;
        string details;
        uint256 amount;
        uint256 timeStamp;
        address owner;
        address signee;
        uint256 timeDelivered;
        uint256 timeAccepted;
        Status status;
        bool isConfirmed;
        Available isAvailable;
    }

    struct RequestStruct {
        uint256 aggrementId;
        address bidder;
        uint256 timeStamp;
        bool isAccepted;
    }

    // declaration of mappings
    mapping(uint256 => AggrementStruct) private aggrements;
    mapping(address => AggrementStruct[]) private aggrementsOf;
    mapping(address => RequestStruct[]) public userRequests;
    mapping(uint256 => RequestStruct[]) public aggreementRequests;
    mapping(uint256 => Available) public isAvailable;
    mapping(address => uint256) public requestCount;

    // declaration of events
    event Action(
        uint256 itemId,
        string actionType,
        Status status,
        address indexed executor
    );

    constructor( uint256 _percentCharges) {
        companyAcc = msg.sender;
        companyBal = 0;
        companyProfit = 0;
        paymentFees = _percentCharges;
    }

    // declaration of functions

    // creates a new aggrement
    function createAggrement(string calldata _details, uint256 _amount) public returns (bool){
        
        require(bytes(_details).length > 0, "Details cannot be empty");
        require(_amount > 0, "Amount must not be zero");
        
        // increament the total number of contracts on the smart contract
        uint256 aggrementId = totalAgg++;
        AggrementStruct storage newAggremnt = aggrements[aggrementId];
        
        // populates the aggrement struct
        newAggremnt.id = aggrementId;
        newAggremnt.details = _details;
        newAggremnt.amount = _amount;
        newAggremnt.timeStamp = block.timestamp;
        newAggremnt.owner = msg.sender;
        newAggremnt.signee = address(0);
        newAggremnt.isConfirmed = false;
        newAggremnt.isAvailable = Available.YES;
        newAggremnt.status = Status.OPEN;

        isAvailable[aggrementId] = Available.YES;

        aggrementsOf[msg.sender].push(newAggremnt); //populate individual aggrement
        aggrements[aggrementId] = newAggremnt;
        
        pay( companyAcc , _amount);
        companyBal += _amount;
        
        emit Action(aggrementId, "AGGREEMENT CREATED", Status.OPEN, msg.sender);
        return true;
    }

    // function get all inidividual aggrement
    function myAggrements() external view returns (AggrementStruct[] memory) {
        return aggrementsOf[msg.sender];
    }

    // function returns all aggrements in the contract
    function AllAggrements() external view returns (AggrementStruct[] memory _aggrements)
    {
        _aggrements = new AggrementStruct[](totalAgg);

        for (uint256 i = 0; i < totalAgg; i++) {
            _aggrements[i] = aggrements[i];
        }

        return _aggrements;
    }

    // function returns all aggrements in the contract
    function singleAggrement( uint256 id) external view returns (AggrementStruct memory )
    {
        return aggrements[id];
    }

    // function to withdraw from smart contract too specified account
    function withdraw( address to, uint256 amt) external returns (bool){
        // check if conditions are met 
        require( msg.sender == companyAcc , " User not allowed ");
        require( amt > 0 ether && amt <= companyProfit , " withdrawal amount too low");

        // perform transaction
        pay(to,amt);

        // update available balance
        companyProfit -= amt ;

        emit Action (
            block.timestamp,
            "WITHDRAWED",
            Status.WITHDRAWED,
            msg.sender
        );

        return true;
    }

    function refund( uint256 id ) external returns (bool){
        
        // check if conditions are met 
        require( msg.sender == companyAcc , " User not allowed ");
        require( !aggrements[id].isConfirmed, " Aggreement already fullfilled");
        
        // refund amount to the specified Aggrement Owner 
        pay(aggrements[id].owner , aggrements[id].amount );

        // update the total balance of the smart contract
        companyBal -= aggrements[id].amount;
        aggrements[id].status = Status.REFUNDED;
        totalDisputed++;

        emit Action (
            id,
            "REFUNDED",
            Status.REFUNDED,
            msg.sender
        );

        return true;
    }
    function signContract( uint256 id) external returns (bool){
        // check if conditions are met 
        require( aggrements[id].isAvailable == Available.YES , " Aggreement not available");
        require( aggrements[id].owner != msg.sender , " User not allowed ");
        require( aggrements[id].signee == address(0) , " Aggreement already signed");
        require( aggrements[id].status == Status.OPEN , " Aggreement not available");

        // update the aggrement struct
        aggrements[id].signee = msg.sender;
        aggrements[id].status = Status.PENDING;

        // update the total number of confirmed aggrements
        totalConfirmedAgg++;

        emit Action (
            id,
            "AGGREEMENT SIGNED",
            Status.PENDING,
            msg.sender
        );

        return true;
    }

    function confirmAggrement( uint256 id) external returns (bool){
        // check if conditions are met 
        require( aggrements[id].isAvailable == Available.YES , " Aggreement not available");
        require( aggrements[id].owner == msg.sender , " User not allowed ");
        require( aggrements[id].signee != address(0) , " Aggreement not signed");
        require( aggrements[id].status == Status.PENDING , " Aggreement not available");

        // update the aggrement struct
        aggrements[id].isConfirmed = true;
        aggrements[id].status = Status.CONFIRMED;

        // update the total number of confirmed aggrements
        totalConfirmedAgg++;

        emit Action (
            id,
            "AGGREEMENT CONFIRMED",
            Status.CONFIRMED,
            msg.sender
        );

        return true;
    }

    function disputeAggrement( uint256 id) external returns (bool){
        // check if conditions are met 
        require( aggrements[id].isAvailable == Available.YES , " Aggreement not available");
        require( aggrements[id].owner == msg.sender , " User not allowed ");
        require( aggrements[id].signee != address(0) , " Aggreement not signed");
        require( aggrements[id].status == Status.PENDING , " Aggreement not available");

        // update the aggrement struct
        aggrements[id].isConfirmed = false;
        aggrements[id].status = Status.DISPUTED;

        // update the total number of confirmed aggrements
        totalDisputed++;

        emit Action (
            id,
            "AGGREEMENT DISPUTED",
            Status.DISPUTED,
            msg.sender
        );

        return true;
    }

    function cancelAggrement( uint256 id) external returns (bool){
        // check if conditions are met 
        require( aggrements[id].isAvailable == Available.YES , " Aggreement not available");
        require( aggrements[id].owner == msg.sender , " User not allowed ");
        require( aggrements[id].signee != address(0) , " Aggreement not signed");
        require( aggrements[id].status == Status.PENDING , " Aggreement not available");

        // update the aggrement struct
        aggrements[id].isConfirmed = false;
        aggrements[id].status = Status.CANCELLED;

        // update the total number of confirmed aggrements
        totalDisputed++;

        emit Action (
            id,
            "AGGREEMENT CANCELLED",
            Status.CANCELLED,
            msg.sender
        );

        return true;
    }

    function pay( address to, uint256 amt) internal returns (bool){
        // check if conditions are met 
        require( amt > 0 ether && amt <= companyBal , " withdrawal amount too low");

        // perform transaction
        (bool success, ) = to.call{value: amt}("");
        require(success, "Transfer failed.");

        // update available balance
        companyBal -= amt ;

        emit Action (
            block.timestamp,
            "PAYMENT MADE",
            Status.PAYMENT,
            msg.sender
        );

        return true;
    }

    function getBalance() external view returns (uint256){
        return address(this).balance;
    }

    function getCompanyBalance() external view returns (uint256){
        return companyBal;
    }

    function getCompanyProfit() external view returns (uint256){
        return companyProfit;
    }

    function getCompanyAddress() external view returns (address){
        return companyAcc;
    }
    
    function getAggrementCount() external view returns (uint256){
        return aggrements.length;
    }
}
