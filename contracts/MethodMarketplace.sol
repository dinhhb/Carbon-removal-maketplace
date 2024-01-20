// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MethodMarketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Method {
        uint id; // 32
        uint price; // 32
        bytes32 proof; // 32
        address owner; // 20
        State state; // 1
    }

    // Mapping of methodHash to Method data
    mapping(bytes32 => Method) private ownedMethods;

    // Mapping of methodId to methodHash
    mapping(uint => bytes32) private ownedMethodHash;

    // number of all methods = id of the method
    uint private totalOwnedMethods;

    address payable private owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Method has invalid state!
    error InvalidState();

    /// Method is not created!
    error MethodIsNotCreated();

    /// Method has already a owner!
    error MethodHasOwner();

    /// Sender is not the method owner!
    error SenderIsNotMethodOwner();

    /// Only owner has an access!
    error OnlyOwner();

    modifier onlyOwner() {
        if (msg.sender != getContractOwner()) {
            revert OnlyOwner();
        }
        _;
    }

    // method id: 0x00000000000000000000000000003130
    // proof: 0x0000000000000000000000000000313000000000000000000000000000003130
    function purchaseMethod(bytes16 methodId, bytes32 proof) external payable {
        bytes32 methodHash = keccak256(abi.encodePacked(methodId, msg.sender));

        if (hasMethodOwnership(methodHash)){
            revert MethodHasOwner();
        }

        uint id = totalOwnedMethods++;

        ownedMethodHash[id] = methodHash;
        ownedMethods[methodHash] = Method({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });
    }

    function repurchaseMethod(bytes32 methodHash) external payable {
        if (!isMethodCreated(methodHash)) {
            revert MethodIsNotCreated();
        }

        if (!hasMethodOwnership(methodHash)) {
            revert SenderIsNotMethodOwner();
        }

        Method storage method = ownedMethods[methodHash];

        if (method.state != State.Deactivated) {
            revert InvalidState();
        }

        method.state = State.Purchased;
        method.price = msg.value;
    }

    function activateMethod(bytes32 methodHash) external onlyOwner {
        if (!isMethodCreated(methodHash)) {
            revert MethodIsNotCreated();
        }

        Method storage method = ownedMethods[methodHash];

        if (method.state != State.Purchased) {
            revert InvalidState();
        }

        method.state = State.Activated;
    }

    function deactivateMethod(bytes32 methodHash) external onlyOwner {
        if (!isMethodCreated(methodHash)) {
            revert MethodIsNotCreated();
        }

        Method storage method = ownedMethods[methodHash];

        if (method.state != State.Purchased) {
            revert InvalidState();
        }

        (bool success, ) = method.owner.call{value: method.price}("");
        require(success, "Transfer failed");

        method.state = State.Deactivated;
        method.price = 0;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function getMethodCount() external view returns (uint) {
        return totalOwnedMethods;
    }

    function getMethodHashAtIndex(uint index) external view returns (bytes32) {
        return ownedMethodHash[index];
    } 

    function getMethodByHash(bytes32 methodHash) external view returns (Method memory) {
        return ownedMethods[methodHash];
    }

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    function isMethodCreated(bytes32 methodHash) private view returns (bool) {
        return ownedMethods[methodHash].owner != 0x0000000000000000000000000000000000000000;
    }

    function hasMethodOwnership(bytes32 methodHash) private view returns (bool) {
        return ownedMethods[methodHash].owner == msg.sender;
    } 
}
