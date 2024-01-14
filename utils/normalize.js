export const METHOD_STATES = {
    0: "Đã mua",
    1: "Đã kích hoạt",
    2: "Đã vô hiệu hoá"
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