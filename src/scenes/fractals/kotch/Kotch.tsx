import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';
import useCapture from 'use-capture';
import { Camera } from '../../../components/DefaultCamera';

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
        <Camera zoom={20} />
        <color attach="background" args={[0, 0, 0]} />
        <group>

        </group>
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
