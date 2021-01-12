import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { DefaultCamera } from '../../../components';

const DrawCantor: FC = () => {

  return (
    <lineSegments>
      <bufferGeometry
        attach="geometry"
        onUpdate={geometry => {
          // geometry.setIndex(indices);
          geometry.setAttribute('position', new THREE.Float32BufferAttribute([-10, 10, 0, 20, 10, 0], 3));
        }}
      />
      <lineBasicMaterial attach="material" />
    </lineSegments>
  );
};

const Cantor: FC = () => {

  return (
    <Canvas>
      <DefaultCamera zoom={10} position={[0, 0, 5]} />
      <color attach="background" args={[0, 0, 0]} />
      <DrawCantor />
    </Canvas>
  );
};

export default Cantor;
