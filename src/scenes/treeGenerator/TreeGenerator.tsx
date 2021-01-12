import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { DefaultCamera } from '../../components';

const generateRandomNumber = (min: number, max: number) => min + Math.floor(Math.random() * (max + 1 - min));

const DrawTree: FC = () => {
  const { viewport } = useThree();
  const { points, indices } = useMemo(() => {
    const x1 = 0,
      y1 = 1 - (viewport.height / 2) ,
      angle = 90,
      length = 4,
      startDepth = 8,
      randomBranchLengthMax = Math.floor((viewport.height / length) / startDepth) + 0.5;
    let index = 0;
    console.log(y1);

    const points: number[] = [];
    const indices: number[] = [];
    const generateBranches = (x1: number, y1: number, angle: number, depth: number, randomBranchMax: number) => {
      const branchArmLength = generateRandomNumber(depth === startDepth ? 0.1 : 0, randomBranchMax);

      if (depth !== 0) {
        const x2 = x1 + (Math.cos(angle * (Math.PI / 180.0)) * depth * branchArmLength);
        const y2 = y1 + (Math.sin(angle * (Math.PI / 180.0)) * depth * branchArmLength);
        points.push(x1, y1, 0, x2, y2, 0);
        indices.push(index++, index, index, index++, index, index);

        generateBranches(x2, y2, angle - generateRandomNumber(15, 20), depth - 1, randomBranchMax);
        generateBranches(x2, y2, angle + generateRandomNumber(15, 20), depth - 1, randomBranchMax);
      }
    };

    generateBranches(x1, y1, angle, startDepth, randomBranchLengthMax);

    return { points, indices };
  }, [viewport.height]);

  return (
    <>
      <lineSegments>
        <bufferGeometry
          attach="geometry"
          onUpdate={geometry => {
            geometry.setIndex(indices);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
          }}
        />
        <lineBasicMaterial attach="material" />
      </lineSegments>
    </>
  );
};

const TreeGenerator: FC = () => {

  return (
    <Canvas>
      <DefaultCamera zoom={20} position={[0, 0, 5]} />
      <DrawTree />
    </Canvas>
  );
};

export default TreeGenerator;

{/*
  <lineSegments>
    <bufferGeometry
      attach="geometry"
      onUpdate={geometry => {
        geometry.setAttribute('position', new THREE.Float32BufferAttribute([-100, 10, 0, 100, -10, 0, -100, -10, 0, 200, 0, 0], 3));
      }}
    />
    <lineBasicMaterial attach="material" />
  </lineSegments> 
*/}
