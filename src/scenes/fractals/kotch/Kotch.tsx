import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { Canvas, useThree, useUpdate } from 'react-three-fiber';
import { Vector2 } from 'three';
import useCapture from 'use-capture';
import { Camera } from '../../../components/DefaultCamera';

const Line: FC = () => {
  const { viewport } = useThree();
  const x1 = (viewport.width / 100) * 3;
  const y1 = viewport.height * 7 / 8;
  const len = viewport.width - (x1 * 2);
  const lineBufferRef = useUpdate<THREE.BufferGeometry>(geometry => {
    geometry.setFromPoints([new Vector2(x1, y1), new Vector2(x1 + len, y1)]);
  }, []);

  return (
    <group>
      <line>
        <bufferGeometry ref={lineBufferRef} />
        <lineBasicMaterial color={0x0000ff} />
      </line>
      {/* <Line key={index} points={LineObject.points} stroke={stroke} strokeWidth={strokeWidth} /> */}
    </group>
  );
};

const Kotch: FC = () => {
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
        <Camera zoom={1} />
        <color attach="background" args={[0, 0, 0]} />
        <Line />
      </Canvas>
      <Box position="absolute" bottom={0}>
        <Button onClick={startRecording} color="secondary">
          Record
        </Button>
      </Box>
    </>
  );
};

export default Kotch;
