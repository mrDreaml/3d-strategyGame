import React, { useEffect }  from "react"
import main from '../../game/main'

const Display = ({ parentRef, setUiState }) => {
    useEffect(() => main(parentRef, setUiState), [parentRef])
    return null
}
export default Display
