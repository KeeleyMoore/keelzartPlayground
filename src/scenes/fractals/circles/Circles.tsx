import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

const DrawCirlces = () => {
  const three = useThree();
  // this needs fixing so the bufer geom renders a circle instead of a dot or joining lines
  const { indices, positions, circlePoints } = useMemo(() => {

    const reduceX = true, reduceY = true, startX = 0, startY = 0;
    // const minRadius = 2;
    const minRadius = 5;
    const circlePoints: number[] = [];

    const indices: number[] = [];
    const positions: number[] = [];

    let startRadius = 16;
    let currentIndex = 0;

    const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
      const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

      const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
      const points = circleShape2.getSpacedPoints(segmentCount);

      points.forEach((segment, index) => {
        const firstIndex = !index;
        const lastIndex = index === points.length - 1;

        // Set the first and last position an additional time to open and close the circle loop
        if (firstIndex || lastIndex) {
          circlePoints.push(segment.x, segment.y, 0);

          // Increment the currentIndex an additional time on the first and last index of each circle
          indices.push(
            firstIndex ? currentIndex++ : currentIndex,
            currentIndex,
            lastIndex ? currentIndex++ : currentIndex + 1
          );
        }
        indices.push(currentIndex + 1, currentIndex++, currentIndex + 1, currentIndex + 1, currentIndex, currentIndex++);

        // using lineSegment you must specify the start and end position for each line segment
        circlePoints.push(segment.x, segment.y, 0, segment.x, segment.y, 0);

      });

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

    return { indices, positions, circlePoints };
  }, []);

  return (
    <lineSegments position-x={three.viewport.width / 2} position-y={three.viewport.height / 2}>
      <bufferGeometry
        onUpdate={self => {
          self.setIndex(indices);
          self.setAttribute('position', new THREE.Float32BufferAttribute(circlePoints, 3));
        }}
      />
    </lineSegments>
  );
};

const Circles: FC = () => (
  <Canvas>
    <Camera zoom={13} />
    <color attach="background" args={[0, 0, 0]} />
    <DrawCirlces />
  </Canvas >
);

export default Circles;
