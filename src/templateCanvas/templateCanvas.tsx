import { Box, Button } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import useCapture from 'use-capture';

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

const TemplateCanvas: FC = () => {

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

      </Canvas>
      <Box position="absolute" bottom={0}>
        <Button onClick={startRecording} color="secondary">
          Record
        </Button>
      </Box>
    </>
  );
};

export default TemplateCanvas;
