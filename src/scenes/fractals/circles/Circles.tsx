import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

const drawCircles = () => {
  const reduceX = true, reduceY = true, x = 0, y = 0;
  const minRadius = 5;
  const circlePoints: THREE.Vector2[][] = [];

  let radius = 16;
  let nextRadius = radius / 2;

  const drawCircle = (circleRadius: number, circleX: number, circleY: number) => {
    const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);
    circlePoints.push(circleShape2.getSpacedPoints(radius * 3));
  };

  drawCircle(radius, x, y);

  const divideCircle = () => {
    if (reduceX) {
      drawCircle(nextRadius, x - radius, y);
      drawCircle(nextRadius, x + radius, y);
    }
    if (reduceY) {
      drawCircle(nextRadius, x, y - radius);
      drawCircle(nextRadius, x, y + radius);
    }
    radius = nextRadius;
    nextRadius = radius / 2;
  };

  if (radius > minRadius) {
    divideCircle();
  }
  console.log(circlePoints);
  return circlePoints;
};

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

  const circleShape = new THREE.Shape().ellipse(0, 0, 25, 25, 0, Math.PI * 2, false, 0);
  const circleShape2 = new THREE.Path().absellipse(0, 0, 16, 16, 0, Math.PI * 2, true, 0);

  const circles = drawCircles();

  return (
    <Canvas>
      <Camera zoom={20} />
      <color attach="background" args={[0, 0, 0]} />
      {circles.map((circle) => (
        <lineLoop position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(circle)} />
        </lineLoop>
      ))}
      {/* <lineLoop position-x={50} position-y={25}>
        <bufferGeometry onUpdate={self => self.setFromPoints(squircleShape.getPoints())} />
      </lineLoop>
      <lineLoop position-x={50} position-y={25}>
        <bufferGeometry onUpdate={self => self.setFromPoints(circleShape.getSpacedPoints(50))} />
      </lineLoop>
      <lineLoop position-x={50} position-y={25}>
        <bufferGeometry onUpdate={self => self.setFromPoints(circleShape2.getSpacedPoints(70))} />
      </lineLoop>
      <lineLoop position={[50, 25, 0]}>
        <circleBufferGeometry args={[15, 64]} />
        <lineBasicMaterial color={0x0000ff} />
      </lineLoop> */}
    </Canvas>
  );
};

export default Circles;
