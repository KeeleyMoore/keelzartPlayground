import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

// const Circle = () => {
//   return (
//     <>
//     </>
//   )
// }

// const DrawCircles = () => {
//   return (
//     <Circle />
//   )
// }

const Circles: FC = () => {
  const x = 1, y = 1;
  const defaults = {
    reduceX: true,
    reduceY: false,
    minRadius: 6,
    minRadiusCap: 5,
  };
  const rangeValues = {
    xMin: x - y,
    xMax: x + y,
    yMin: 0,
    yMax: y * 2,
  };

  const arcShape = new THREE.Shape().absarc(0, 0, 18, 0, Math.PI * 2, false);

  const squircleRadius = 20;
  const squircleShape = new THREE.Shape().moveTo(0, squircleRadius)
    .quadraticCurveTo(squircleRadius, squircleRadius, squircleRadius, 0)
    .quadraticCurveTo(squircleRadius, - squircleRadius, 0, - squircleRadius)
    .quadraticCurveTo(- squircleRadius, - squircleRadius, - squircleRadius, 0)
    .quadraticCurveTo(- squircleRadius, squircleRadius, 0, squircleRadius);

  const circleShape = new THREE.Shape().ellipse(0,0,25,25,0, Math.PI * 2, false, 0);
  const circleShape2 = new THREE.Path().absellipse(0,0,16, 16,0, Math.PI * 2, true, 0);

    return(
      <Canvas>
        <Camera zoom={20} />
        <color attach="background" args={[0, 0, 0]} />
        <lineLoop position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(arcShape.getPoints())} />
        </lineLoop>
        <lineLoop position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(squircleShape.getPoints())} />
        </lineLoop>
        <lineLoop position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(circleShape.getSpacedPoints( 50 ))} />
        </lineLoop>
        <lineLoop position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(circleShape2.getSpacedPoints( 70 ))} />
        </lineLoop>
        <lineLoop position={[50, 25, 0]}>
          <circleBufferGeometry args={[15, 64]} />
          <lineBasicMaterial color={0x0000ff} />
        </lineLoop>
      </Canvas>
    );
};

export default Circles;
