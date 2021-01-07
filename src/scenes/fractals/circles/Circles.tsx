import React, { FC, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

const drawCircles = () => {
  const reduceX = true, reduceY = true, startX = 0, startY = 0;
  const minRadius = 0.3;
  const circlePoints: THREE.Vector2[][] = [];

  const positions: number[] = [];

  let startRadius = 16;

  const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
    const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

    const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
    circlePoints.push(circleShape2.getSpacedPoints(segmentCount));

    positions.push(circleX, circleY, 0);
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
  const { indices, positions } = useMemo(() => {

    const reduceX = true, reduceY = true, startX = 0, startY = 0;
    const minRadius = 0.3;
    const circlePoints: THREE.Vector2[][] = [];

    const indices: number[] = [];
    const positions: number[] = [];

    let startRadius = 16;
    let currentIndex = 0;

    const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
      const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

      const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
      circlePoints.push(circleShape2.getSpacedPoints(segmentCount));

      positions.push(circleX, circleY, 0);
      indices.push(currentIndex, currentIndex++);
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

    return { indices, positions };
  }, []);

  // Uncomment this line and the circles map to display the circles rendering each as their own geom
  // const circles = drawCircles();

  return (
    <Canvas>
      <Camera zoom={18} />
      <color attach="background" args={[0, 0, 0]} />
      {/* {circles.map((circle) => (
        <line position-x={50} position-y={25}>
          <bufferGeometry onUpdate={self => self.setFromPoints(circle)} />
        </line>
      ))} */}
      {/* <points position-x={50} position-y={25}> */}
      <line position-x={50} position-y={25}>
        <circleBufferGeometry
          args={[15, 64]}
          onUpdate={self => {
            self.setIndex(indices);
            self.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          }}
        />
      </line>
      {/* </points> */}
    </Canvas >
  );
};

export default Circles;
