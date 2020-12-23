import React, { FC, useEffect, useRef } from 'react';
import { Box, Button } from '@material-ui/core';
import { Canvas, useThree } from 'react-three-fiber';
import useCapture from 'use-capture';
import * as THREE from 'three';

function createGeometry() {

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const vertex = new THREE.Vector3();

  for (let i = 0; i < 1500; i++) {
    const pi = Math.PI;
    const piX = ((pi / 1500));
    if (!(i % 15)) {
      console.log(piX);
      console.log(Math.cos(i));
    }
    // console.log(piX);
    // console.log(Math.random() * 2 - 1);
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;

    vertex.normalize();
    vertex.multiplyScalar(450);

    vertices.push(vertex.x, vertex.y, 0);

    vertex.multiplyScalar(Math.random() * 0.09 + 0.1);

    vertices.push(vertex.x, vertex.y, vertex.z);

  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return geometry;

}

const Line: FC = () => {
  const ref = useRef<THREE.InstancedMesh>();
  const geometry = createGeometry();

  return (
    <lineSegments
      ref={ref}
      scale={[0.5, 0.5, 0.5]}
      geometry={geometry}
      userData={{ originalScale: 0.25 }}
      rotation={[0, Math.random() * Math.PI, 0]}
    >
      <lineBasicMaterial color={0xff7700} opacity={1} />
    </lineSegments>
  );
};

interface CameraProps { zoom: number }
const Camera: FC<CameraProps> = ({ zoom }) => {
  const camera = useRef();
  const { setDefaultCamera } = useThree();
  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void setDefaultCamera(camera.current!), []);
  return (
    <orthographicCamera zoom={zoom} position={[0, 0, 5]} ref={camera} onUpdate={self => self.updateProjectionMatrix()} />
  );
};

const Lines: FC = () => {

  const [bind, startRecording] = useCapture({ duration: 21, fps: 25, filename: 'breathingDots', framerate: 60, verbose: false, format: 'webm', motionBlurFrames: 0, showWidget: true, children: undefined });

  return (
    <>
      <Canvas
        colorManagement={false}
        gl={{
          preserveDrawingBuffer: true,
        }}
        onCreated={bind}
      >
        <Camera
          zoom={1}
        />
        <Line />
        <color attach="background" args={[0, 0, 0]} />
      </Canvas>
      <Box position="absolute" bottom={0}>
        <Button onClick={startRecording} color="secondary">
          Record
        </Button>
      </Box>
    </>
  );
};

export default Lines;
