import React, { FC, useMemo } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';

import { Camera } from '../../components/DefaultCamera';

const generateRandomNumber = (min: number, max: number) => min + Math.floor(Math.random() * (max + 1 - min));

// depth: 12,
// length: 6.6,
// thickness: 3,
// treesGenerated: 1,
// thicknessMax: 20,
// lengthMax: 10,
// depthMax: 13,
// height: window.innerHeight - 120,
// width: window.innerWidth,

const DrawTree: FC = () => {
  const { viewport } = useThree();
  const { points, indices } = useMemo(() => {
    const x1 = viewport.width / 2,
      y1 = viewport.height - 120,
      angle = 90,
      length = 6.6,
      thickness = 3,
      depth = 2,
      randomBranchMax = Math.floor((x1 / length) / depth);
    let index = 0;

    const points: number[] = [];
    const indices: number[] = [];
    const generateBranches = (x1: number, y1: number, angle: number, depth: number, randomBranchMax: number, thickness: number) => {
      const branchArmLength = generateRandomNumber(0, randomBranchMax);

      if (depth !== 0) {
        const x2 = x1 + (Math.cos(angle * (Math.PI / 180.0)) * depth * branchArmLength);
        const y2 = y1 + (Math.sin(angle * (Math.PI / 180.0)) * depth * branchArmLength);
        points.push(x1, y1, 0, x2, y2, 0);
        indices.push(index, index++);
        // LineArray.push({ points: [x1, y1, x2, y2], strokeWidth: depth * thickness });

        generateBranches(x2, y2, angle - generateRandomNumber(15, 20), depth - 1, randomBranchMax, thickness);
        generateBranches(x2, y2, angle + generateRandomNumber(15, 20), depth - 1, randomBranchMax, thickness);
      }
    };

    generateBranches(x1, y1, angle, depth, randomBranchMax, thickness);

    return { points, indices };
  }, [viewport]);
  console.log(points, indices);
  return (
    <>
      <lineSegments position-x={(viewport.width / 2) - 1225} position-y={viewport.height / 2}>
        <bufferGeometry
          attach="geometry"
          onUpdate={geometry => {
            geometry.setIndex(indices);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
          }}
        />
        <lineBasicMaterial attach="material" />
      </lineSegments>
      <lineSegments position-x={(viewport.width / 2) - 1225} position-y={viewport.height / 2}>
        <geometry />
        <lineBasicMaterial attach="material" />
      </lineSegments>
    </>
  );
};

const TreeGenerator: FC = () => {

  return (
    <Canvas>
      <Camera zoom={20} />
      <DrawTree />
    </Canvas>
  );
};

export default TreeGenerator;
