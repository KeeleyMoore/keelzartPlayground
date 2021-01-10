import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../../components/DefaultCamera';
import { useControlsContext } from '../../../controls';
import { rgbValueFromRange } from '../../../util/canvas';
import { CirclesControlsValue } from './CirclesControls';

interface DrawCirclesProps {
  sceneControls: CirclesControlsValue;
}

const DrawCirlces: FC<DrawCirclesProps> = ({ sceneControls }) => {
  const { y: reduceY = true, x: reduceX = true, colorMin, colorMax, zColor } = sceneControls;
  console.log(reduceY, reduceY);
  const { viewport } = useThree();
  const xStart = viewport.width / 2;
  const yStart = viewport.height / 2;
  const startX = 0, startY = 0;

  const startRadius = Math.ceil(viewport.height / (reduceY ? 4 : 2)) - 2;

  const { indices, colors, circlePoints } = useMemo(() => {

    const minRadius = 0.4;

    const circlePoints: number[] = [];
    const indices: number[] = [];
    const positions: number[] = [];
    const colors: number[] = [];

    let currentIndex = 0;

    const addCircle = (circleRadius: number, circleX: number, circleY: number) => {
      const circleShape2 = new THREE.Path().absellipse(circleX, circleY, circleRadius, circleRadius, 0, Math.PI * 2, true, 0);

      const segmentCount = Math.min(Math.max(circleRadius * 20, 10), 100);
      const points = circleShape2.getSpacedPoints(segmentCount);

      points.forEach((segment, index) => {
        const firstIndex = !index;
        const lastIndex = index === points.length - 1;

        const r = rgbValueFromRange(segment.x + 10, colorMin, colorMax);
        const g = rgbValueFromRange(segment.y - startRadius - 60, colorMin, colorMax);
        const b = rgbValueFromRange(segment.width - zColor, colorMin, colorMax);
        // Set one colour RGB set for each line segment
        colors.push(r, g, b, r, g, b);

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
        // Add unique index pairs for each line segment
        indices.push(currentIndex + 1, currentIndex++, currentIndex + 1, currentIndex + 1, currentIndex, currentIndex++);

        // using lineSegment you must specify the start and end position for each line segment
        circlePoints.push(segment.x, segment.y, 0, segment.x, segment.y, 0);
      });

      //This positions array creates a nice pattern of spread out dots in uniform rows
      positions.push(circleX, circleY, 0);

    };

    const divideCircle = (radius: number, x: number, y: number) => {
      const nextRadius = radius / 2;
      if (reduceX) {
        drawCircle(nextRadius, x - radius, y);
        drawCircle(nextRadius, x + radius, y);
      }
      if (reduceY) {
        drawCircle(nextRadius, x, y - radius);
        drawCircle(nextRadius, x, y + radius);
      } else if (!reduceX) {
        drawCircle(nextRadius, x, y);
      }
    };

    const drawCircle = (radius: number, x: number, y: number) => {
      addCircle(radius, x, y);
      if (radius > minRadius) {
        divideCircle(radius, x, y);
      }
    };

    // Draw the first circle
    drawCircle(startRadius, startX, startY);

    return { indices, colors, circlePoints };
  }, [startRadius, colorMin, colorMax, zColor, reduceX, reduceY]);

  return (
    <lineSegments position-x={xStart} position-y={yStart}>
      <bufferGeometry
        onUpdate={self => {
          self.setIndex(indices);
          self.setAttribute('position', new THREE.Float32BufferAttribute(circlePoints, 3));
          self.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        }}
      />
      <lineBasicMaterial vertexColors morphTargets />
    </lineSegments>
  );
};

const Circles: FC = () => {
  const { currentScene } = useControlsContext();

  return (
    <Canvas>
      <Camera zoom={15} />
      <color attach="background" args={[0, 0, 0]} />
      <DrawCirlces sceneControls={currentScene as unknown as CirclesControlsValue} />
    </Canvas>
  );
};

export default Circles;
