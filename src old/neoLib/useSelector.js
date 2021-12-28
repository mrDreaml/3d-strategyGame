import { useEffect, useState } from "react";

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
};

const useSelector = (NEO_module, selectors) => {
    const { subscribeUpdates, cancelSubscribeUpdates } = NEO_module
    const [state, updateState] = useState({})
    useEffect(() => {
        subscribeUpdates((newState) => {
            if (!selectors) {
                updateState({ ...newState })
                return
            }
            const res = Object.entries(selectors).reduce((acc, [key, selector]) => {
                acc[key] = selector(newState)
                return acc
            }, {})
            updateState(res)
        })
        return () => cancelSubscribeUpdates(updateState)
    }, [])
    return deepFreeze(state)
}

export default useSelector
