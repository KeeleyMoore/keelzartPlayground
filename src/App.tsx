import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';

function Dots() {
  const ref = useRef<THREE.InstancedMesh>();

  const { vec, transform, positions } = useMemo(() => {
    const vec = new THREE.Vector3();
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3();
      position.x = (i % 100) - 50;
      position.y = Math.floor(i / 100) - 50;

      // Offset every other column (hexagonal pattern)
      position.y += (i % 2) * 0.5;
      // Noise generation
      position.x += Math.random() * 0.3;
      position.y += Math.random() * 0.3;
      // read these articles and use a mathamatical and more natural distribution method: https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf, https://en.wikipedia.org/wiki/Centroidal_Voronoi_tessellation
      return position;
    });
    const transform = new THREE.Matrix4();

    return { vec, transform, positions };
  }, []);

  useFrame(({ clock }) => {
    const scale = 1 + Math.sin(clock.elapsedTime) * 0.3;

    for (let i = 0; i < 10000; ++i) {
      vec.copy(positions[i]).multiplyScalar(scale);
      transform.setPosition(vec);
      ref.current!.setMatrixAt(i, transform);
    }

    ref.current!.instanceMatrix.needsUpdate = true;
  });

  const goem = new THREE.CircleBufferGeometry(0.15);
  const mesh = new THREE.MeshBasicMaterial();

  return (
    <instancedMesh ref={ref} args={[goem, mesh, 10000]} count={10000} />
  );
}

export default function App() {
  return (
    <Canvas orthographic camera={{ zoom: 20 }} colorManagement={false}>
      <color attach="background" args={[0, 0, 0]} />
      <Dots />
    </Canvas>
  );
}
