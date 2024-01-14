import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";
import { handler as createOwnedMethodsHook } from "./useOwnedMethods";
import { handler as createOwnedMethodHook } from "./useOwnedMethod";

export const setupHooks = ({web3, provider, contract}) => {
    return {
        useAccount: createAccountHook(web3, provider),
        useNetwork: createNetworkHook(web3, provider),
        useOwnedMethods: createOwnedMethodsHook(web3, contract),
        useOwnedMethod: createOwnedMethodHook(web3, contract)
    }
}