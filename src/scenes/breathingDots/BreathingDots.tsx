import React, { FC, useMemo, useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import { Camera } from '../../components/DefaultCamera';

import { useControlsContext } from '../../controls';
import { streamEnumMetadata } from '../../util/type';
import { useBreathingDotsContext } from './context';
import Effects from './Effects';
import { Waves } from './types';

export const waveMetadata: Record<string, string> = { smooth: 'Smooth', bubble: 'Bubble', roundedSquare: 'Ripple' };
// Smooth motion:
const smoothWave = (sinValue: number) => Math.sin(sinValue);
// Snappy Motion:
const roundedSquareWave = (t: number, delta: number, a: number, f: number) => {
  return ((2 * a) / Math.PI) * Math.atan(smoothWave(2 * Math.PI * t * f) / delta);
};

const waveStyleMetadata: Record<string, (dist: number, t: number, f: number) => number> = {
  smooth: (t: number, f: number) => smoothWave(t * f),
  bubble: (t: number, f: number) => smoothWave(1.5 * Math.PI * t * f),
  roundedSquare: (t: number, f: number, dist: number) => roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.4, f)
};

const waveMultiplyerValue = (t: number, f: number, type: keyof typeof Waves, dist: number,) => streamEnumMetadata(Waves, waveStyleMetadata).find(({ key }) => key === type)?.value(t, f, dist);

interface DotsProps { tValue: number, fValue: number, wave: keyof typeof Waves }
const Dots: FC<DotsProps> = ({ tValue, fValue, wave }) => {
  const ref = useRef<THREE.InstancedMesh>();

  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3();
    const transform = new THREE.Matrix4();

    // Precompute randomized initial positions
    const positions = [...Array(10000)].map((_, i) => {
      const position = new THREE.Vector3();
      // Place in a grid
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

    // Precompute initial distances with octagonal offset
    const right = new THREE.Vector3(1, 0, 0);
    // change the input to the wave based on the dot’s distance from the center
    const distances = positions.map((pos) => (
      //make that wave an octagon instead of a circle
      pos.length() + Math.cos(pos.angleTo(right) * 8) * 0.5
    ));

    return { vec, transform, positions, distances };
  }, []);

  useFrame(({ clock }) => {
    for (let i = 0; i < 10000; ++i) {
      const dist = distances[i];

      // Distance affects the wave phase
      // const t = clock.elapsedTime - dist / 12.5;
      const t = clock.elapsedTime - dist / tValue;
      const f = 1 / fValue;

      // Oscillates between -0.4 and +0.4
      const waveValue = waveMultiplyerValue(t, f, wave, dist);
      // Scale initial position by our oscillator
      vec.copy(positions[i]).multiplyScalar(waveValue! + 1.3);

      // Apply the Vector3 to a Matrix4
      transform.setPosition(vec);
      // Update Matrix4 for this instance
      ref.current!.setMatrixAt(i, transform);
    }

    ref.current!.instanceMatrix.needsUpdate = true;
  });

  // Read this article about post processing to understand what we've used here:
  // https://threejsfundamentals.org/threejs/lessons/threejs-post-processing.html

  return (
    <instancedMesh ref={ref} args={[null as unknown as THREE.BufferGeometry, null as unknown as THREE.Material, 10000]}>
      <circleBufferGeometry args={[0.15]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
};

const BreathingDots: FC = () => {
  const { tSlider, fSlider, wave, zoom } = useBreathingDotsContext();
  const { captureControls: { bind } } = useControlsContext();

  return (
    <Canvas
      colorManagement={false}
      gl={{
        preserveDrawingBuffer: true,
      }}
      onCreated={bind}
    >
      <Camera zoom={zoom} position={[0, 0, 5]} />
      <color attach="background" args={[0, 0, 0]} />
      <Dots wave={wave} tValue={tSlider} fValue={fSlider} />
      <Effects />
    </Canvas>
  );
};

export default BreathingDots;
