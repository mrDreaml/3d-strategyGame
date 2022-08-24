import React, { useState, useReducer } from "react"
import Display from './3dDisplay/index.jsx'
import Map from "./Map/index.jsx"

import styles from './style.scss'

const width = 1920
const height = 1080

const ACTIONS_MAP = {
    setMapData: (state, payload) => {
        state.mapData = payload
        return state
    },
    setPerformance: (state, payload) => {
        state.fps = payload
        return state
    }
}

const rootReducer = (state, actions) => {
    let finalState = { ...state }
    for (const action of actions) {
        finalState = ACTIONS_MAP[action.actionName](finalState, action.payload)
    }
    return finalState
}

const App = () => {
    const [parentRef, setParentRef] = useState(null)
    const [state, setUiState] = useReducer(rootReducer, {})

    return (
        <div ref={ref => setParentRef(ref)} style={{
            width,
            height
        }} className={styles.root} >
            <Display  parentRef={parentRef} setUiState={setUiState} />
            <section className={styles.main}>
                <span className={styles.fps}>FPS: {state.fps}</span>
                <div className={styles.bottomMenu}>
                    <Map mapData={state.mapData}/>
                </div>
            </section>
        </div>
    )
}

export default App;
