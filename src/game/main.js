import * as THREE from "three";
import Computer from "./compute/computer"
import renderCreator from './render/render'
import { loadModels } from './compute/assets/index'
import UiConnector from "./uiConnector/uiConnector";
import UserInteractionManager from "./userInteractions/userInteractionManager";

const init = async (parent) => {
    const { width, height } = parent.getBoundingClientRect()
    const renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( width, height )
    parent.appendChild(renderer.domElement)
    await loadModels()

    alert('Welcome to the scene, key map: upArrow, downArrow, leftArrow, rightArrow, -, +')

    return { renderer, size: { width, height } }
}

const main = async (parentRef, updateUi) => {
    if (!parentRef) {
        return
    }
    const { renderer, size } = await init(parentRef)
    const state = {
        userInteraction: {
            isCameraAvailable: true
        }
    }
    const uiConnector = new UiConnector()
    const userInteractionManager = new UserInteractionManager({ state, uiConnector })
    const computer = new Computer({ state, uiConnector, size })
    const render = renderCreator(renderer)

    let frames = 0
    let prevTime = 0
    renderer.setAnimationLoop(( time ) => {
        render(computer.compute(time, userInteractionManager.getActions(time)))
        if (time - prevTime > 1000) {
            uiConnector.dispatch('setPerformance', frames)
            prevTime = time
            frames = 0
        }
        updateUi(uiConnector.getActions())
        frames++
    })
    //
    // setInterval((time) => {
    //     render(computer.compute(time, userInteractionManager.getActions(time)))
    //     setUiState({ ...state.ui })
    // }, 1000)
}

export default main
