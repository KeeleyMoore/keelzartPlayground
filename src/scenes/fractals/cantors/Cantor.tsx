import React, { FC, useMemo } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

import { DefaultCamera } from '../../../components';

const DrawCantor: FC = () => {
  const division = 33.33 / 100,
    divisionCap = 35,
    strokeWidth = 1,
    startLength = 10,
    startLengthCap = 100,
    rotate = true,
    height = window.innerHeight - 120,
    width = window.innerWidth,
    verticalStart = false;
  const xStart = (width / 100) * startLength,
    yStart = height / 2,
    len = width - (xStart * 2);
  const { points } = useMemo(() => {
    let points = verticalStart ? [xStart, yStart - len / 2, 0, xStart, yStart + len / 2, 0] : [0 - startLength, 0, 0, 0 + startLength / 2, 0, 0];

    const addVertical = (x: number, y: number, length: number) => {
      const x1 = x - len * division;
      const x2 = x - len * division;
      const y1 = y - len / 2;
      const y2 = y + len / 2;
      points.push(x1, y1, 0, x2, y2, 0);

      generateCantorPoints(x1, y1, len, false);
      generateCantorPoints(x2, y2, len, false);
    };

    const addHorizontal = (x: number, y: number, length: number) => {
      const x1 = x;
      const x2 = x + length;
      const y1 = y;
      const y2 = y;
      const len = length * (division * 2);
      points.push(x1, y1, 0, x2, y2, 0);
      generateCantorPoints(x1, y1, len, true);
      generateCantorPoints(x2, y2, len, true);
    };

    const generateCantorPoints = (x: number, y: number, length: number, vertical: boolean) => {

      if (length > 7) {

      if (vertical) {
        return addVertical(x, y, length);
      }
      return addHorizontal(x, y, length);

      }
    };

    generateCantorPoints(xStart, yStart - len / 2, 8, false);

    return { points };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(points);

  return (
    <lineSegments>
      <bufferGeometry
        attach="geometry"
        onUpdate={geometry => {
          // geometry.setIndex(indices);
          geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
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
