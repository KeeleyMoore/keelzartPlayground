import React, { FC, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';

const Circles: FC = () => {
  // this needs fixing so the bufer geom renders a circle instead of a dot or joining lines
  const { indices, positions, circlePoints } = useMemo(() => {

    const reduceX = true, reduceY = true, startX = 0, startY = 0;
    // const minRadius = 2;
    const minRadius = 0.3;
    const circlePoints: number[] = [];

    const indices: number[] = [];
    const positions: number[] = [];

    let startRadius = 16;
    let currentIndex = 0;

    const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
      const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

      const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
      const points = circleShape2.getSpacedPoints(segmentCount);
      // To use with line tag
      // circleShape2.getSpacedPoints(20).forEach((segment) => {
      //   circlePoints.push(segment.x, segment.y, 0);
      // });

      // To use with linesegment tag
      points.forEach((segment, index) => {
        // Set the first and last position an additional time to open and close the circle loop
        if (index === 0 || index === points.length - 1) {
          circlePoints.push(segment.x, segment.y, 0);
        }
        circlePoints.push(segment.x, segment.y, 0, segment.x, segment.y, 0);
        indices.push(currentIndex, currentIndex++);
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

  // Uncomment this line and the circles map to display the circles rendering each as their own geom
  // const circles = drawCircles();

  return (
    <Canvas>
      <Camera zoom={18} />
      <color attach="background" args={[0, 0, 0]} />

      <lineSegments position-x={50} position-y={18}>
        <bufferGeometry
          onUpdate={self => {
            // self.setIndex(indices);
            self.setAttribute('position', new THREE.Float32BufferAttribute(circlePoints, 3));
          }}
        />
      </lineSegments>
      {/* </points> */}
    </Canvas >
  );
};

export default Circles;
