// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// initialize escrow contract
contract Escrow is ReentrancyGuard {
    // declaration of variables
    address public escAcc;
    uint256 public escBal;
    uint256 public escAvailBal;
    uint256 public escFee;
    uint256 public totalAggrements = 0;
    uint256 public totalConfirmed = 0;
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
        address developer;
        bool isConfirmed;
        uint256 timeDelivered;
        uint256 timeAccepted;
        Status status;
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

    constructor(uint256 _percentCharges) {
        escAcc = msg.sender;
        escBal = 0;
        escAvailBal = 0;
        escFee = _percentCharges;
    }

    // declaration of functions

    // creates a new aggrement
    function createAggrement(string calldata _details, uint256 _amount)
        public
        returns (bool)
    {
        require(bytes(_details).length > 0, "Purpose cannot be empty");
        require(_amount > 0, "Amount must exceed zero ethers");
        uint256 aggrementId = totalAggrements++;
        AggrementStruct storage newAggremnt = aggrements[aggrementId];

        // populates the aggrement struct
        newAggremnt.id = aggrementId;
        newAggremnt.details = _details;
        newAggremnt.amount = _amount;
        newAggremnt.timeStamp = block.timestamp;
        newAggremnt.owner = msg.sender;
        newAggremnt.developer = address(0);
        newAggremnt.isConfirmed = false;
        newAggremnt.isAvailable = Available.YES;
        newAggremnt.status = Status.OPEN;
        isAvailable[aggrementId] = Available.YES;

        aggrementsOf[msg.sender].push(newAggremnt); //poplate individual aggrement
        aggrements[aggrementId] = newAggremnt;

        emit Action(aggrementId, "AGGREEMENT CREATED", Status.OPEN, msg.sender);
        return true;
    }

    // function get all inidividual aggrement
    function myAggrements() external view returns (AggrementStruct[] memory) {
        return aggrementsOf[msg.sender];
    }

    // function returns all aggrements in the contract
    function AllAggrements()
        external
        view
        returns (AggrementStruct[] memory _aggrements)
    {
        _aggrements = new AggrementStruct[](totalAggrements);

        for (uint256 i = 0; i < totalAggrements; i++) {
            _aggrements[i] = aggrements[i];
        }

        return _aggrements;
    }

    // function to generate requests
}
