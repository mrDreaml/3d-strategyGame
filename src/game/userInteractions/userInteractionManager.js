const CAMERA_DIRECTION_BY_ARROW = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'Equal': 'high',
    'Minus': 'low',
}

const cameraActions = (event) => {
    switch (event.code) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Equal':
        case 'Minus':
        {
            const actionName = 'moveCamera'
            const direction = CAMERA_DIRECTION_BY_ARROW[event.code]
            return { actionName, payload: { direction }}
        }
    }
    return {}
}

class UserInteractionManager {
    constructor({ state }) {
        this.state = state
        this.patch = []
        document.addEventListener('keydown', this.globalKeyDownListener)
        document.addEventListener('mousedown', this.globalMouseDownHandler)
        document.addEventListener('mouseup', this.globalMouseUpHandler)
        this.complexEvents = {
            drag: [null, null, null], // mouseDown, mouseMove, mouseUp
        }
    }

    dispatch({ actionName, payload }) {
        this.patch.push({ actionName, payload })
    }

    globalKeyDownListener = (event) => {
        this.state.userInteraction.isCameraAvailable && this.dispatch(cameraActions(event))
    }

    globalMouseDownHandler = (event) => {
        document.addEventListener('mousemove', this.handleDragEvent)
        this.handleDragEvent(event)
    }

    globalMouseUpHandler = (event) => {
        document.removeEventListener('mousemove', this.handleDragEvent)
        this.handleDragEvent(event)
    }

    globalComplexDragEvent = (mouseUpEvent, mouseMoveEvent, mouseDownEvent) => {
        console.log(mouseUpEvent.type, mouseMoveEvent.type, mouseDownEvent?.type)
    }

    handleDragEvent = (event) => {
        switch (event.type) {
            case 'mousedown': {
                this.complexEvents.drag[0] = event
                break
            }
            case 'mousemove': {
                this.complexEvents.drag[1] = event
                break
            }
            case 'mouseup': {
                this.complexEvents.drag[2] = event
                break
            }
        }
        if (this.complexEvents.drag[1] !== null) {
            this.globalComplexDragEvent(...this.complexEvents.drag)
            if (this.complexEvents.drag[2] !== null) {
                this.complexEvents.drag = [null, null, null]
            }
        }
    }

    getActions = () => {
        const res = this.patch
        this.patch = []
        return res
    }

    destruct() {
        document.removeEventListener('keydown', this.globalKeyDownListener)
        document.removeEventListener('mousedown', this.globalMouseDownHandler)
        document.removeEventListener('mouseup', this.globalMouseUpHandler)
        document.removeEventListener('mousemove', this.handleDragEvent)
    }
}

export default UserInteractionManager
