import React, { FC, useMemo, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { Camera } from '../../../components/DefaultCamera';

interface KotchCurvePattern {
  vertex: {
    x: number;
    y: number;
    z: number;
  }[];
  loop: boolean;
  margin: number[];
}

const kotchCurvePatterns: Record<string, KotchCurvePattern> = {
  'line': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
    ],
    loop: true,
    margin: [650, 100]
  },
  'triangle': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 200, y: 320, z: 0 },
      { x: 400, y: 0, z: 0 },
    ],
    loop: true,
    margin: [650, 250]
  },
  'square': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 0, y: 400, z: 0 },
    ],
    loop: true,
    margin: [650, 350]
  },
  'squareMirrored': {
    vertex: [
      { x: 0, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 0, y: 400, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 400, z: 0 },
      { x: 400, y: 400, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
    ],
    loop: true,
    margin: [650, 550]
  },
  'cross': {
    vertex: [
      { x: 200, y: 0, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 200, y: 0, z: 0 },
      { x: 200, y: 200, z: 0 },
      { x: 200, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 200, y: 0, z: 0 },
      { x: 200, y: -200, z: 0 },
      { x: 200, y: 0, z: 0 },
    ],
    loop: false,
    margin: [650, 750]
  },
  'diamond': {
    vertex: [
      { x: 200, y: -200, z: 0 },
      { x: 400, y: 0, z: 0 },
      { x: 200, y: 200, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 200, y: -200, z: 0 }
    ],
    loop: false,
    margin: [650, 450]
  }
};

const kotchsCurvePatterns = (selectedPatterns: string[]) => {
  return selectedPatterns.map(pattern => kotchCurvePatterns[pattern]);
};

function Line() {
  const lines = useRef();
  const geom = useRef<THREE.BufferGeometry>();
  const three = useThree();

  const { indices, positions, colors } = useMemo(() => {
    const indices: number[] = [];
    const positions: number[] = [];
    const colors: number[] = [];

    let next_positions_index = 0;
    const iteration_count = 4;
    const rangle = 60 * Math.PI / 180.0;

    const add_vertex = (v: THREE.Vector3) => {
      if (next_positions_index === 0xffff) console.error('Too many points.');
      positions.push(v.x, v.y, v.z);
      colors.push(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1);

      return next_positions_index++;
    };

    const lineSegment = (p0: THREE.Vector3, p4: THREE.Vector3, depth: number) => {

      if (--depth < 0) {
        const i = next_positions_index - 1; // p0 already there
        add_vertex(p4);
        indices.push(i, i + 1);

        return;
      }

      // Copy end position and subtract start position
      const v = p4.clone().sub(p0);
      // Divide by 3 to get segments length
      const v_tier = v.clone().multiplyScalar(1 / 3);

      // Add segment length to start pos to get next pos
      const p1 = p0.clone().add(v_tier);

      // Calculate angle between y and x then add the value of a right angle
      const angle = Math.atan2(v.y, v.x) + rangle;
      const length = v_tier.length();
      const p2 = p1.clone();
      // Use cos to calculate the x vertex position from the angle and multiply by segment length to add to the previous x's postion
      p2.x += Math.cos(angle) * length;
      // Use sin to calculate the y vertex position from the angle and multiply by segment length to add to the previous y's postion
      p2.y += Math.sin(angle) * length;
      // subtrack segment length from end vertex to get 2nd to last vertex
      const p3 = p4.clone().sub(v_tier);

      lineSegment(p0, p1, depth);
      lineSegment(p1, p2, depth);
      lineSegment(p2, p3, depth);
      lineSegment(p3, p4, depth);
    };

    const drawPattern = (points: THREE.Vector3[], loop: boolean, x_offset: number) => {
      for (let iteration = 0; iteration !== iteration_count; iteration++) {

        add_vertex(points[0]);

        for (let p_index = 0, p_count = points.length - 1; p_index !== p_count; p_index++) {
          lineSegment(points[p_index], points[p_index + 1], iteration);
        }

        if (loop) lineSegment(points[points.length - 1], points[0], iteration);

        // translate input curve for next iteration
        for (let p_index = 0, p_count = points.length; p_index !== p_count; p_index++) {
          points[p_index].x += x_offset;
        }
      }
    };

    const selectedPatterns = ['line', 'triangle', 'square', 'squareMirrored', 'cross', 'diamond'];
    const patternsToDraw = kotchsCurvePatterns(selectedPatterns);

    let yStart = 0;
    patternsToDraw.forEach(({ vertex, margin, loop }) => {
      yStart += margin[1];
      drawPattern(
        vertex.map(({ x, y, z }) => new THREE.Vector3(x, yStart + y, z)),
        loop,
        margin[0]
      );
    });

    return { indices, positions, colors };
  }, []);

  return (
    <group>
      <lineSegments ref={lines} position-x={(three.viewport.width / 2) - 1225} position-y={100}>
        <bufferGeometry
          attach="geometry"
          ref={geom}
          onUpdate={geometry => {
            geometry.setIndex(indices);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            geometry.computeBoundingSphere();
          }}
        />
        <lineBasicMaterial attach="material" />
      </lineSegments>
    </group>
  );
}

const Kotch: FC = () => {
  return (
    <Canvas
      pixelRatio={window.devicePixelRatio}
    >
      <Camera zoom={0.25} />
      <color attach="background" args={[0, 0, 0]} />
      <Line />
    </Canvas >
  );
};

export default Kotch;
