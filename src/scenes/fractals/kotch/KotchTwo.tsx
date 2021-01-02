import React, { FC, useEffect, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const InstancedLine: FC = () => {
  const lines = useRef<THREE.LineSegments>();
  const geomRef = useRef<THREE.InstancedBufferGeometry>();

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

  useEffect(() => {
    snowflake(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(500, 0, 0)
      ],
      false, 600
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    geomRef.current?.setIndex(indices);
    geomRef.current?.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geomRef.current?.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geomRef.current?.computeBoundingSphere();
  });

  return (
    <group>
      <lineSegments
        ref={lines}
        position={[-1200, -1200, 0]}
      >
        <bufferGeometry
          attach="geometry"
          ref={geomRef}
        // attributes={{ position: new THREE.Float32BufferAttribute(positions, 3), color: new THREE.Float32BufferAttribute(colors, 3) }}
        // index={new THREE.Float32BufferAttribute(indices, 1)}
        // computeBoundingSphere
        />
        <lineBasicMaterial attach="material" vertexColors />
      </lineSegments>
    </group>
  );
};

function Line() {
  const lines = useRef();
  const geom = useRef<THREE.BufferGeometry>();

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

  // const snowflake = (points: THREE.Vector3[], loop: boolean, x_offset: number) => {
  //   for (let iteration = 0; iteration !== 1; iteration++) {

  //     add_vertex(points[0]);

  //     for (let p_index = 0, p_count = points.length - 1; p_index !== p_count; p_index++) {

  //       snowflake_iteration(points[p_index], points[p_index + 1], iteration);

  //     }

  //     if (loop) snowflake_iteration(points[points.length - 1], points[0], iteration);

  //     // translate input curve for next iteration

  //     for (let p_index = 0, p_count = points.length; p_index !== p_count; p_index++) {

  //       points[p_index].x += x_offset;

  //     }

  //   }
  // };
  // snowflake([
  //   new THREE.Vector3(0, 0, 0),
  //   new THREE.Vector3(500, 0, 0)
  // ], false, 600);

  // positions.push(v.x, v.y, v.z);
  // colors.push(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1);

  add_vertex(new THREE.Vector3(0, 0, 0));
  snowflake_iteration(new THREE.Vector3(0, 0, 0), new THREE.Vector3(500, 0, 0), 0);

  console.log(positions);
  console.log(lines);

  return (
    <lineSegments ref={lines} position-x={-1200} position-y={-1200}>
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
  );
}

const KotchTwo: FC = () => {
  return (
    <Canvas>
      {/* <perspectiveCamera args={[27, window.innerWidth / window.innerHeight, 1, 10000]} position-z={9000} /> */}
      <color attach="background" args={[0, 0, 0]} />
      {/* <Line /> */}
      {/* <line>
        <bufferGeometry
          onUpdate={self => {
            self.setFromPoints([new THREE.Vector3(- 10, 0, 0), new THREE.Vector3(0, 10, 0), new THREE.Vector3(10, 0, 0)]);
          }}
        >
        </bufferGeometry>
      </line> */}
      <lineSegments>
        <bufferGeometry
          onUpdate={geometry => {
            // geometry.setFromPoints([new THREE.Vector2(-9, 0), new THREE.Vector2(0, 9), new THREE.Vector2(0, 0)]);
            geometry.setAttribute('position', new THREE.Float32BufferAttribute([
              -9.1, 0, 0,
              0, 1, 0,
              0, 1, 0,
              7.1, 0, 0,
              7.1, 0, 0,
              9.1, 0, 0
            ], 3));
            // geometry.computeBoundingSphere();
          }}
        />
        <lineBasicMaterial attach="material" />
      </lineSegments>
    </Canvas >
  );
};

export default KotchTwo;
