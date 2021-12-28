import React  from 'react'

const createWorkFlow = (parentRef) => {
    const { width, height } = parentRef.getBoundingClientRect()
    console.log({width, height})

    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 1000 );
    camera.position.z = 15;

    const scene = new THREE.Scene();

    const light = new THREE.PointLight( 0xffffff, 5, 100 );
    light.position.set(0, 0, 15);
    scene.add( light );

    this.renderer.setSize( width, height );

    console.log('model:', MODEL)
    const loader = new GLTFLoader();
    const sheep = new THREE.Group()
    loader.load(MODEL, (gltf) => {
        console.log('loaded', gltf, scene)
        sheep.add(gltf.scene);
    });
    scene.add(sheep)


    parentRef.appendChild(new THREE.WebGLRenderer( { antialias: true } ));
}

const App = () => (
    <>
       <h1>Hello world</h1>
    </>
)

export default App