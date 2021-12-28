import React, { useState } from "react"
import Display from './3dDisplay/index.jsx'
import Map from "./Map/index.jsx"

import styles from './style.scss'

const width = 1920
const height = 1080

const App = () => {
    const [parentRef, setParentRef] = useState(null)
    const [state, setState] = useState({})
    return (
        <div ref={ref => setParentRef(ref)} style={{
            width,
            height
        }} className={styles.root} >
            <Display  parentRef={parentRef} setUiState={setState} />
            <section className={styles.main}>
                <div className={styles.bottomMenu}>
                    <Map mapData={state.mapData}/>
                </div>
            </section>
        </div>
    )
}

export default App;
