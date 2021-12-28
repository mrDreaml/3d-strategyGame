import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";

import tank from './objects/tank/index.js'
import grid from './objects/grid/index.js'

const loader = new GLTFLoader()

const getter = (name, obj) => Object.keys(obj).map(key => ([`${name}.${key}`, tank[key]]))

const objects = [
    ...getter('tank', tank),
    ['grid', grid]
]

const MODELS = {}

export const getModel = key => {
    return SkeletonUtils.clone(MODELS[key])
}

export const loadModels = async () => {
    for (const [key, obj] of objects) {
        console.log('load', {key, obj})
        MODELS[key] = await new Promise(res => loader.load(obj, gltf => {
            res(gltf.scene)
        }))
    }
}
