class UiConnector {
    constructor (state) {
        this.uiState = state
        this.patch = []
    }

    getState () {
        return this.uiState
    }

    dispatch (actionName, payload) {
        this.patch.push({ actionName, payload })
    }

    getActions () {
        const res = this.patch
        this.patch = []
        return res
    }
}

export default UiConnector