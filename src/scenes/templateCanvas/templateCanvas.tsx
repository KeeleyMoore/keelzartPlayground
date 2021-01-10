import React, { FC } from 'react';
import { Canvas } from 'react-three-fiber';

import { DefaultCamera } from '../../components';
import { useControlsContext } from '../../controls';

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
      <DefaultCamera zoom={20} />
      <color attach="background" args={[0, 0, 0]} />

    </Canvas>
  );
};

export default TemplateCanvas;
