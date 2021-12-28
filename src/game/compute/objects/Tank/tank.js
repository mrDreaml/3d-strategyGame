import * as THREE from 'three'
import { getModel } from "../../assets/index.js"

class Tank {
    constructor({ position }) {
        this.name = 'Tank'
        this.threeGroup = new THREE.Group()
        this.parts = {
            body: getModel('tank.body'),
            turret: getModel('tank.turret')
        }
        position && this.threeGroup.position.set(...position)
        for (const child of Object.values(this.parts)) {
            this.threeGroup.add(child)
        }
        this.uuid = this.threeGroup.uuid
        console.log(this.threeGroup)
    }

    getName = () => this.name

    getId = () => this.uuid

    on() {

    }


    getRenderData() {
        return this.threeGroup
    }
}

export default Tank
