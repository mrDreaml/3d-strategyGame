import * as THREE from "three"
import Tank from './objects/Tank/tank.js'
import Grid from "./objects/Grid/grid.js";

class Computer {
    constructor({ state, uiConnector, size: { width, height } }) {
        this.state = state
        this.uiConnector = uiConnector
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
        this.camera.position.set( 0, 15, 10 )
        this.camera.rotation.set( -Math.PI / 3.4, 0, 0 )
        this.objects = [
            new Grid({ position: [100, 0, 100] }),
            new Tank({ position: [5, 0, 2.5] })
        ]
    }

    performActions = (actions) => {
        for (const { actionName, payload } of actions) {
            if (actionName === 'moveCamera') {
                const step = 1
                switch (payload.direction) {
                    case 'left': {
                        this.camera.position.x -= step
                        break
                    }
                    case 'right': {
                        this.camera.position.x += step
                        break
                    }
                    case 'up': {
                        this.camera.position.z -= step
                        break
                    }
                    case 'down': {
                        this.camera.position.z += step
                        break
                    }
                    case 'high': {
                        this.camera.position.y -= step
                        break
                    }
                    case 'low': {
                        this.camera.position.y += step
                        break
                    }
                }
            }
        }
    }

    getMapData() {
        const res = [{
            id: this.camera.uuid,
            name: 'camera',
            position: this.camera.position
        }]

        for (const object of this.objects) {
            res.push({
                id: object.getId(),
                name: object.getName(),
                position: object.getRenderData().position
            })
        }
        return res
    }

    compute(time, actions) {
        this.performActions(actions)
        this.uiConnector.dispatch('setMapData', this.getMapData())

        const scene = new THREE.Scene()
        for (const obj of this.objects) {
            scene.add(obj.getRenderData())
        }
        const light = new THREE.DirectionalLight( 0xffffff, 2, 100 )
        scene.fog = new THREE.Fog(0xffffff, 30, 70)
        scene.background = new THREE.Color(0xeeeeee)
        scene.add(light)

        return {
            scene,
            camera: this.camera,
        }
    }
}

export default Computer
