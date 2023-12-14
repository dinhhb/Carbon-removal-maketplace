import methods from "./index.json"

export const getAllMethods = () => {
    
    return{
        data: methods,
        methodMap: methods.reduce((a, c, i) => {
            a[c.id] = c
            a[c.id].index = i
            return a
        }, {})
    }
}