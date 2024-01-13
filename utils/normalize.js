export const METHOD_STATES = {
    0: "purchased",
    1: "activated",
    2: "deactivated"
}

export const normalizeOwnedMethod = web3 => (method, ownedMethod) => {
    return {
        ...method,
        ownedMethodId: ownedMethod.id,
        proof: ownedMethod.proof,
        owner: ownedMethod.owner,
        price: web3.utils.fromWei(ownedMethod.price),
        state: METHOD_STATES[ownedMethod.state]
    }
}