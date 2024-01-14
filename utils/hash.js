

export const createMethodHash = (web3) => (methodId, account) => {
    const hexMethodId = web3.utils.utf8ToHex(methodId)
    const methodHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexMethodId },
        { type: "address", value: account }
    )
    return methodHash
}