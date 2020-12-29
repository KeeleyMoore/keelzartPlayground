import React, { FC, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { Camera } from '../../components/DefaultCamera';
import { useControlsContext } from '../../controls';

function createGeometry() {

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const vertex = new THREE.Vector3();

  for (let i = 0; i < 1500; i++) {
    const pi = Math.PI;
    const piX = ((pi / 1500));
    if (!(i % 15)) {
      console.log(piX);
      console.log(Math.cos(i));
    }
    // console.log(piX);
    // console.log(Math.random() * 2 - 1);
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;

    vertex.normalize();
    vertex.multiplyScalar(450);

    vertices.push(vertex.x, vertex.y, 0);

    vertex.multiplyScalar(Math.random() * 0.09 + 0.1);

    vertices.push(vertex.x, vertex.y, vertex.z);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return geometry;

}

const Line: FC = () => {
  const ref = useRef<THREE.InstancedMesh>();
  const geometry = createGeometry();

  return (
    <lineSegments
      ref={ref}
      scale={[0.5, 0.5, 0.5]}
      geometry={geometry}
      userData={{ originalScale: 0.25 }}
      rotation={[0, Math.random() * Math.PI, 0]}
    >
      <lineBasicMaterial color={0xff7700} opacity={1} />
    </lineSegments>
  );
};

const Lines: FC = () => {
  const { captureControls: { bind } } = useControlsContext();

  return (
    <Canvas
      colorManagement={false}
      gl={{
        preserveDrawingBuffer: true,
      }}
      onCreated={bind}
    >
      <Camera zoom={1} position={[0, 0, 5]} />
      <Line />
      <color attach="background" args={[0, 0, 0]} />
    </Canvas>
  );
};

export default Lines;
