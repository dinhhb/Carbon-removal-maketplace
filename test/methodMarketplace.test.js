// Mocha - testing framework
// Chai - assertion JS library

const { catchRevert } = require("./utils/exceptions")

const MethodMarketplace = artifacts.require("MethodMarketplace")

const getBalance = async address => web3.eth.getBalance(address)
const toBN = value => web3.utils.toBN(value)

const getGas = async (result) => {
    const tx = await web3.eth.getTransaction(result.tx)
    const gasUsed = toBN(result.receipt.gasUsed)
    const gasPrice = toBN(tx.gasPrice)
    const gas = gasUsed.mul(gasPrice)   // gas = gasUsed x gasPrice
    return gas
}

contract("MethodMarketplace", accounts => {

    const methodId = "0x00000000000000000000000000003130";
    const proof = "0x0000000000000000000000000000313000000000000000000000000000003130";

    const methodId2 = "0x00000000000000000000000000002130";
    const proof2 = "0x0000000000000000000000000000213000000000000000000000000000002130";

    const value = "900000000";

    let _contract = null
    let contractOwner = null
    let buyer = null
    let methodHash = null

    before(async () => {
        _contract = await MethodMarketplace.deployed()
        contractOwner = accounts[0]
        buyer = accounts[1]

        console.log(_contract)
        console.log(contractOwner)
        console.log(buyer)
    })

    describe("Purchase the new method", () => {
        before(async () => {
            await _contract.purchaseMethod(methodId, proof, { from: buyer, value })
        })

        it("should NOT allow to repurchase already owned method", async () => {
            await catchRevert(_contract.purchaseMethod(methodId, proof, { from: buyer, value }))
        })

        it("can get the purchased method hash by index", async () => {
            const index = 0
            methodHash = await _contract.getMethodHashAtIndex(index)
            const expectedHash = web3.utils.soliditySha3(
                { type: "bytes16", value: methodId },
                { type: "address", value: buyer }
            )

            assert.equal(methodHash, expectedHash, "Method hash is not matching the hash of the purchased method")
        })

        it("should match the data of the method purchased by buyer", async () => {
            const expectedIndex = 0
            const expectedState = 0
            const method = await _contract.getMethodByHash(methodHash)

            assert.equal(method.id, expectedIndex, "Method index should be 0")
            assert.equal(method.price, value, `Method price should be ${value}`)
            assert.equal(method.proof, proof, `Method proof should be ${proof}`)
            assert.equal(method.owner, buyer, `Method owner should be ${buyer}`)
            assert.equal(method.state, expectedState, `Method state should be ${expectedState}`)
        })
    })

    describe("Activate the purchased method", () => {

        it("should NOT be able to activate method by NOT contract owner", async () => {
            await catchRevert(_contract.activateMethod(methodHash, { from: buyer }))
        })

        it("shoud have 'activated' state", async () => {
            await _contract.activateMethod(methodHash, { from: contractOwner })
            const method = await _contract.getMethodByHash(methodHash)
            const expectedState = 1

            assert.equal(method.state, expectedState, "Method should have 'activated' state")
        })
    })

    describe("Transfer ownership", () => {
        let currentOwner = null

        before(async () => {
            currentOwner = await _contract.getContractOwner();
        })

        it("getContractOwner should return deployer address", async () => {
            assert.equal(contractOwner, currentOwner, "Contract owner is not matching the one from getContractOwner function")
        })

        it("should NOT transfer ownership when contract owner is not sending transaction", async () => {
            await catchRevert(_contract.transferOwnership(accounts[3], { from: accounts[2] }))
        })

        it("should transfer ownership to 3rd address from 'accounts'", async () => {
            await _contract.transferOwnership(accounts[2], { from: currentOwner })
            const owner = await _contract.getContractOwner()
            assert.equal(owner, accounts[2], "Contract owner is not the 2nd account")
        })

        it("should transfer ownership back to initial contract owner", async () => {
            await _contract.transferOwnership(contractOwner, { from: accounts[2] })
            const owner = await _contract.getContractOwner()
            assert.equal(owner, contractOwner, "Contract owner is not set")
        })
    })

    describe("Deactivate method", () => {
        let methodHash2 = null
        let currentOwner = null

        before(async () => {
            await _contract.purchaseMethod(methodId2, proof2, { from: buyer, value })
            methodHash2 = await _contract.getMethodHashAtIndex(1)
            currentOwner = await _contract.getContractOwner()
        })

        it("should NOT be able to deactivate the method by NOT contract owner", async () => {
            await catchRevert(_contract.deactivateMethod(methodHash2, { from: buyer }))
        })

        it("should have status of deactivated and price 0", async () => {
            const beforeTxBuyerBalance = await getBalance(buyer)
            const beforeTxContractBalance = await getBalance(_contract.address)
            const beforeTxOwnerBalance = await getBalance(currentOwner)

            const result = await _contract.deactivateMethod(methodHash2, { from: contractOwner })

            const afterTxBuyerBalance = await getBalance(buyer)
            const afterTxContractBalance = await getBalance(_contract.address)
            const afterTxOwnerBalance = await getBalance(currentOwner)

            const method = await _contract.getMethodByHash(methodHash2)
            const expectedState = 2
            const expectedPrice = 0
            const gas = await getGas(result)

            assert.equal(method.state, expectedState, "Method is NOT deactivated")
            assert.equal(method.price, expectedPrice, "Mehtod price is not 0")

            assert.equal(
                toBN(beforeTxOwnerBalance).sub(gas).toString(),
                afterTxOwnerBalance, 
                "Contract owner balance is not correct"
            )
            
            assert.equal(
                toBN(beforeTxBuyerBalance).add(toBN(value)).toString(),
                afterTxBuyerBalance, 
                "Buyer balance is not correct"
            )

            assert.equal(
                toBN(beforeTxContractBalance).sub(toBN(value)).toString(),
                afterTxContractBalance, 
                "Contract balance is not correct"
            )
        })

        it("should NOT be able activate deactivated method", async () => {
            await catchRevert(_contract.activateMethod(methodHash2, { from: contractOwner }))
        })
    })

    describe("Repurchase method", () => {
        let methodHash2 = null

        before(async () => {
            methodHash2 = await _contract.getMethodHashAtIndex(1)
        })

        it("should NOT repurchase when the method doesn't exist", async () => {
            const notExistingHash = "0x5ceb3f8075c3dbb5d490c8d1e6c950302ed065e1a9031750ad2c6513069e3fc3"
            await catchRevert(_contract.repurchaseMethod(notExistingHash, { from: buyer }))
        })

        it("should NOT repurchase with NOT method owner", async () => {
            const notOwnerAddress = accounts[2]
            await catchRevert(_contract.repurchaseMethod(methodHash2, { from: notOwnerAddress }))
        })

        it("should be able to repurchase with the original buyer", async () => {
            const beforeTxBuyerBalance = await getBalance(buyer)
            const beforeTxContractBalance = await getBalance(_contract.address)

            const result = await _contract.repurchaseMethod(methodHash2, { from: buyer, value })

            const afterTxBuyerBalance = await getBalance(buyer)
            const afterTxContractBalance = await getBalance(_contract.address)

            const expectedState = 0
            const method = await _contract.getMethodByHash(methodHash2)
            const gas = await getGas(result)

            assert.equal(method.state, expectedState, "The method is not in purchased state")
            assert.equal(method.price, value, `The method price is not equal to ${value}`)

            assert.equal(
                toBN(beforeTxBuyerBalance).sub(toBN(value)).sub(gas).toString(),
                afterTxBuyerBalance,
                "Client balance is not correct"
            )

            assert.equal(
                toBN(beforeTxContractBalance).add(toBN(value)).toString(),
                afterTxContractBalance,
                "Contract balance is not correct"
            )
        })

        it("should NOT be able to repurchase purchased method", async () => {
            await catchRevert(_contract.repurchaseMethod(methodHash2, { from: buyer }))
        })
    })

    describe("Receive funds", () => {
        it("should have transacted funds", async () => {
            const value = "1000000000000000000"
            const contractBeforeTx = await getBalance(_contract.address)

            await web3.eth.sendTransaction({from: buyer, to: _contract.address, value: value})

            const contractAfterTx = await getBalance(_contract.address)

            assert.equal(
                toBN(contractBeforeTx).add(toBN(value)).toString(),
                contractAfterTx,
                "Value after transaction is not matching" 
            )
        })
    })

    describe("Normal withdraw", () => {
        const fundsToDeposit = "1000000000000000000"
        const overLimitFunds = "999999000000000000000"
        let currentOwner = null

        before(async () => {
            currentOwner = await _contract.getContractOwner()
            await web3.eth.sendTransaction({from: buyer, to: _contract.address, value: fundsToDeposit})
        })

        it("should fail when withdrawing with NOT owner address", async () => {
            const value = "1000000000000000000"
            await catchRevert(_contract.withdraw(value, {from: buyer}))
        })

        it("should fail when withdrawing OVER limit balance", async () => {
            await catchRevert(_contract.withdraw(overLimitFunds, {from: currentOwner}))
        })

        it("should have +0.1 eth after withdraw", async () => {
            const ownerBalance = await getBalance(currentOwner)
            const result = await _contract.withdraw(fundsToDeposit, {from: currentOwner})
            const newOwnerBalance = await getBalance(currentOwner)
            const gas = await getGas(result)

            assert.equal(
                toBN(ownerBalance).add(toBN(fundsToDeposit)).sub(gas).toString(),
                newOwnerBalance,
                "The new owner balance is not correct"
            )
        })
    })

    describe("Emergency withdraw", () => {
        let currentOwner

        before(async () => {
            currentOwner = await _contract.getContractOwner()
        })

        after(async () => {
            await _contract.resumeContract({from: currentOwner})
        })

        it("should fail when contract is NOT stopped", async () => {
            await catchRevert(_contract.emergencyWithdraw({from: currentOwner}))
        })

        it("should have +contract funds on contract owner", async () => {
            await _contract.stopContract({from: contractOwner})

            const contractBalance = await getBalance(_contract.address)
            const ownerBalance = await getBalance(currentOwner)

            const result = await _contract.emergencyWithdraw({from: currentOwner})
            const gas = await getGas(result)

            const newOwnerBalance = await getBalance(currentOwner)

            assert.equal(
                toBN(ownerBalance).add(toBN(contractBalance)).sub(gas),
                newOwnerBalance,
                "Owner doesn't have contract balance"
            )
        })

        it("should have contract balance of 0", async () => {
            const contractBalance = await getBalance(_contract.address)

            assert.equal(
                contractBalance,
                0,
                "Contract balance is not 0"
            )
        })
    })

    describe("Self destruct", () => {
        let currentOwner

        before(async () => {
            currentOwner = await _contract.getContractOwner()
        })

        it("should fail when contract is NOT stopped", async () => {
            await catchRevert(_contract.selfDestruct({from: currentOwner}))
        })

        it("should have +contract funds on contract owner", async () => {
            await _contract.stopContract({from: contractOwner})

            const contractBalance = await getBalance(_contract.address)
            const ownerBalance = await getBalance(currentOwner)

            const result = await _contract.selfDestruct({from: currentOwner})
            const gas = await getGas(result)

            const newOwnerBalance = await getBalance(currentOwner)

            assert.equal(
                toBN(ownerBalance).add(toBN(contractBalance)).sub(gas),
                newOwnerBalance,
                "Owner doesn't have contract balance"
            )
        })

        it("should have contract balance of 0", async () => {
            const contractBalance = await getBalance(_contract.address)

            assert.equal(
                contractBalance,
                0,
                "Contract balance is not 0"
            )
        })

        it("should have 0x bytecode", async () => {
            const code = await web3.eth.getCode(_contract.address)

            assert.equal(
                code,
                "0x",
                "Contract is not destroyed"
            )
        })
    })
})