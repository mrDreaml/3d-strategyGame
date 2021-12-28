import * as THREE from "three";
import Computer from "./compute/computer"
import renderCreator from './render/render'
import { loadModels } from './compute/assets/index'
import UserInteractionManager from "./userInteractions/userInteractionManager";

const init = async (parent) => {
    const { width, height } = parent.getBoundingClientRect()
    const renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setSize( width, height )
    parent.appendChild(renderer.domElement)
    await loadModels()
    return { renderer, size: { width, height } }
}

const main = async (parentRef, setUiState) => {
    if (!parentRef) {
        return
    }
    const { renderer, size } = await init(parentRef)
    const state = {
        userInteraction: {
            isCameraAvailable: true
        },
        ui: {
          mapData: []
        }
    }
    const userInteractionManager = new UserInteractionManager({ state })
    const computer = new Computer({ state, size })
    const render = renderCreator(renderer)


    renderer.setAnimationLoop(( time ) => {
        render(computer.compute(time, userInteractionManager.getActions(time)))
        setUiState({ ...state.ui })
    })
    //
    // setInterval((time) => {
    //     render(computer.compute(time, userInteractionManager.getActions(time)))
    //     setUiState({ ...state.ui })
    // }, 1000)
}

export default main
