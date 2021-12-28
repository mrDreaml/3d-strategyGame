const NEO = ({ isLogModeOn = false } = {}) => {
    let currentStore = null
    let PATCH = {}
    let LOG_DATA = { updates: [] }
    let emmitors = []

    const updatePatch = (prop, value) => {
        PATCH[prop] = value

        if (isLogModeOn) {
            if (LOG_DATA.updates.length > 99) {
                LOG_DATA.updates.shift()
            }
            LOG_DATA.updates.push([prop, value])
        }
    }

    const executeBatch = () => {
        Object.assign(currentStore, PATCH)
        emmitors.forEach(callback => callback(currentStore))
        PATCH = {}
    }

    const STATE = {}

    const futureState = new Proxy(STATE, {
        set: (obj, prop, value) => {
            currentStore = obj
            updatePatch(prop, value)
            requestAnimationFrame(executeBatch)
            return true
        }
    })

    const subscribeUpdates = callback => {
        emmitors.push(callback)
    }

    const cancelSubscribeUpdates = callback => {
        emmitors = emmitors.filter(v => v !== callback)
    }

    const getLogData = () => LOG_DATA.updates

    return {
        futureState,
        subscribeUpdates,
        cancelSubscribeUpdates,
        getLogData
    }
}

export default NEO