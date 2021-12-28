import * as THREE from 'three'
import { getModel } from "../../assets/index.js"

class Grid {
    constructor({ position }) {
        this.name = 'Grid'
        this.threeGroup = new THREE.Group()
        this.parts = { grid: getModel('grid') }
        position && this.parts.grid.position.set(...position)
        for (const child of Object.values(this.parts)) {
            this.threeGroup.add(child)
        }
        this.uuid = this.threeGroup.uuid
    }

    getName = () => this.name

    getId = () => this.uuid

    on() {

    }


    getRenderData() {
        return this.threeGroup
    }
}

export default Grid
