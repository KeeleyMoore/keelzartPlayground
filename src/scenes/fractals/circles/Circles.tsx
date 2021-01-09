import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';
import { rgbValueFromRange } from '../../../util/canvas';

const DrawCirlces = () => {
  const { viewport } = useThree();
  const xStart = viewport.width / 2;
  const yStart = viewport.height / 2;

  const startRadius = Math.ceil(viewport.height / 4);
  console.log(startRadius);
  const min = 0 - startRadius;
  const max = startRadius;

  const { indices, colors, circlePoints } = useMemo(() => {

    const minRadius = 0.4;
    const reduceX = true, reduceY = true, startX = 0, startY = 0;
    // const minRadius = 2;
    const circlePoints: number[] = [];

    const indices: number[] = [];
    const positions: number[] = [];

    let currentIndex = 0;

    const colors: number[] = [];

    const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
      const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

      const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
      const points = circleShape2.getSpacedPoints(segmentCount);

      points.forEach((segment, index) => {
        const firstIndex = !index;
        const lastIndex = index === points.length - 1;
        // const r = Math.random();
        // const g = Math.random();
        // const b = Math.random();

        const r = rgbValueFromRange(segment.x, min, max);
        const g = rgbValueFromRange(segment.y, min, max);
        const b = rgbValueFromRange(segment.y + segment.x, min, max);

        // Set the first and last position an additional time to open and close the circle loop
        if (firstIndex || lastIndex) {
          circlePoints.push(segment.x, segment.y, 0);

          // Increment the currentIndex an additional time on the first and last index of each circle
          indices.push(
            firstIndex ? currentIndex++ : currentIndex,
            currentIndex,
            lastIndex ? currentIndex++ : currentIndex + 1
          );

          if (firstIndex) {
            colors.push(r, g, b, r, g, b);
          }
        }
        indices.push(currentIndex + 1, currentIndex++, currentIndex + 1, currentIndex + 1, currentIndex, currentIndex++);

        // using lineSegment you must specify the start and end position for each line segment
        circlePoints.push(segment.x, segment.y, 0, segment.x, segment.y, 0);

        // colours
        colors.push(r, g, b, r, g, b);
      });

      console.log();

      //This positions array creates a nice pattern of spread out dots in uniform rows
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

    // const colors: number[] = circlePoints.map((point: number) => rgbValueFromRange(point, min, max));

    return { indices, colors, circlePoints };
  }, [startRadius, max, min]);

  console.log(colors);
  // console.log(indices.length, colors.length, circlePoints.length);

  return (
    <lineSegments position-x={xStart} position-y={yStart}>
      <bufferGeometry
        onUpdate={self => {
          // self.setIndex(indices);
          self.setAttribute('position', new THREE.Float32BufferAttribute(circlePoints, 3));
          self.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        }}
      />
      <lineBasicMaterial
        vertexColors morphTargets
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
