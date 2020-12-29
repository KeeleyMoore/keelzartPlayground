import { Box, Button } from '@material-ui/core';
import React, { FC, useEffect, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import useCapture from 'use-capture';
import { useControlsContext } from '../../controls';

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
  const { captureControls: { bind } } = useControlsContext();
  return (
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
  );
};

export default TemplateCanvas;
