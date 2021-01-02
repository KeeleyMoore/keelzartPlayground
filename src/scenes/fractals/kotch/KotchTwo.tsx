import React, { FC, useMemo, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { Camera } from '../../../components/DefaultCamera';

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

    const snowflake_iteration = (p0: THREE.Vector3, p4: THREE.Vector3, depth: number) => {

      if (--depth < 0) {
        const i = next_positions_index - 1; // p0 already there
        add_vertex(p4);
        indices.push(i, i + 1);

        return;
      }

      const v = p4.clone().sub(p0);
      const v_tier = v.clone().multiplyScalar(1 / 3);
      const p1 = p0.clone().add(v_tier);

      const angle = Math.atan2(v.y, v.x) + rangle;
      const length = v_tier.length();
      const p2 = p1.clone();
      p2.x += Math.cos(angle) * length;
      p2.y += Math.sin(angle) * length;

      const p3 = p0.clone().add(v_tier).add(v_tier);

      snowflake_iteration(p0, p1, depth);
      snowflake_iteration(p1, p2, depth);
      snowflake_iteration(p2, p3, depth);
      snowflake_iteration(p3, p4, depth);

    };

    // const drawLine = () => {
    //   add_vertex(new THREE.Vector3(-9.1, 0, 0));
    //   snowflake_iteration(new THREE.Vector3(-9.1, 0, 0), new THREE.Vector3(9.1, 0, 0), 0);
    // };

    const snowflake = (points: THREE.Vector3[], loop: boolean, x_offset: number) => {
      for (let iteration = 0; iteration !== iteration_count; iteration++) {

        add_vertex(points[0]);

        for (let p_index = 0, p_count = points.length - 1; p_index !== p_count; p_index++) {
          snowflake_iteration(points[p_index], points[p_index + 1], iteration);
        }

        if (loop) snowflake_iteration(points[points.length - 1], points[0], iteration);

        // translate input curve for next iteration
        for (let p_index = 0, p_count = points.length; p_index !== p_count; p_index++) {
          points[p_index].x += x_offset;

        }
      }
    };

    let y = 0;
    
    snowflake(
      [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(500, y, 0)
      ],
      false, 600
    );
    y += 300;
    snowflake(
      [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(500, y, 0),
        new THREE.Vector3(500, y, 0),
        new THREE.Vector3(0, y, 0),
      ],
      false, 600
    );

    y += 300;
    snowflake(
      [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(250, y + 400, 0),
        new THREE.Vector3(500, y, 0)
      ],
      true, 600
    );

    y += 400;
    snowflake(
      [
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(500, y, 0),
        new THREE.Vector3(500, y + 500, 0),
        new THREE.Vector3(0, y + 500, 0)
      ],
      true, 600
    );

    y += 800;
    snowflake(
      [
        new THREE.Vector3(250, y, 0),
        new THREE.Vector3(500, y, 0),
        new THREE.Vector3(250, y, 0),
        new THREE.Vector3(250, y + 250, 0),
        new THREE.Vector3(250, y, 0),
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(250, y, 0),
        new THREE.Vector3(250, y - 250, 0),
        new THREE.Vector3(250, y, 0)
      ],
      false, 600
    );

    y += 600;
    snowflake(
      [
        new THREE.Vector3(250, y - 250, 0),
        new THREE.Vector3(500, y, 0),
        new THREE.Vector3(250, y + 250, 0),
        new THREE.Vector3(0, y, 0),
        new THREE.Vector3(250, y - 250, 0),
        // new THREE.Vector3(250, y, 0)
      ],
      false, 600
    );

    return { indices, positions, colors };
  }, []);

  return (
    <group>
      <lineSegments ref={lines} position-x={(three.viewport.width / 2) - 1150} position-y={100}>
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

const KotchTwo: FC = () => {
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

export default KotchTwo;
