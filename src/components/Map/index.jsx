import React from "react"
import styles from './style.scss'

import cn from 'classnames'

const Item = ({ name, position }) => (
    <div
        className={cn(styles.mapItem, { [styles.itemCamera]: name === 'camera' })}
        style={{ top: position.z, left: position.x }}
    />
)

const Map = ({ mapData = [] }) => {
    return <div className={styles.mapRoot}>
        {mapData.map((data) => <Item key={data.id} {...data} />)}
    </div>
}

export default Map
