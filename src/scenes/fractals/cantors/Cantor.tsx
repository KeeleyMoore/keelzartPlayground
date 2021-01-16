import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { DefaultCamera } from '../../../components';

const DrawSimpleCantor: FC = () => {
  const { viewport } = useThree();
  const startLength = 80,
    width = viewport.width;

  const length = (width / 100) * startLength;
  const division = 1 / 3;

  const xStart = 0 - length / 2,
    yStart = 0;

  const { points } = useMemo(() => {
    const generateCantorPoints = (x: number, y: number, length: number) => {
      points.push(x, y, 0, x + length, y, 0);

      if (length > 1) {
        const newY = y + 10;
        generateCantorPoints(x, newY, length * division);
        generateCantorPoints(x + (length * (division * 2)), newY, length / 3);
      }
    };

    let points: number[] = [];
    generateCantorPoints(xStart, yStart, length);

    return { points };

  }, [length, xStart, division]);

  return (
    <lineSegments>
      <bufferGeometry
        attach="geometry"
        onUpdate={geometry => {
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
      <DefaultCamera zoom={1} position={[0, 0, 5]} />
      <color attach="background" args={[0, 0, 0]} />
      <DrawSimpleCantor />
    </Canvas>
  );
};

export default Cantor;
