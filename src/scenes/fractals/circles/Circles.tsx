import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

const drawCircles = () => {
  const reduceX = true, reduceY = true, startX = 0, startY = 0;
  const minRadius = 0.3;
  const circlePoints: THREE.Vector2[][] = [];

  let startRadius = 16;

  const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
    const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);
    const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
    circlePoints.push(circleShape2.getSpacedPoints(segmentCount));
  };

  const divideCircle = (radius: number, x: number, y: number) => {
    if (reduceX) {
      drawCircle(radius / 2, x - radius, y);
      drawCircle(radius / 2, x + radius, y);
    }
    if (reduceY) {
      drawCircle(radius / 2, x, y - radius);
      drawCircle(radius / 2, x, y + radius);
    }
  };

  const drawCircle = (radius: number, x: number, y: number) => {
    addCircle(radius, x, y);
    if (radius > minRadius) {
      divideCircle(radius, x, y);
    }
  };

  drawCircle(startRadius, startX, startY);

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
      <Camera zoom={18} />
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
