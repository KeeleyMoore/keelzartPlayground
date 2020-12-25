import { Box, Button } from '@material-ui/core';
import React, { FC } from 'react';
import { Canvas, useThree, useUpdate } from 'react-three-fiber';
import { Vector2 } from 'three';
import useCapture from 'use-capture';
import { Camera } from '../../../components/DefaultCamera';
interface LinesProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
const Line: FC<LinesProps> = ({ x1, x2, y1, y2 }) => {

  const lineBufferRef = useUpdate<THREE.BufferGeometry>(geometry => {
    geometry.setFromPoints([new Vector2(x1, y1), new Vector2(x2, y2)]);
  }, []);

  return (
    <group>
      <line>
        <bufferGeometry ref={lineBufferRef} />
        <lineBasicMaterial color={0x0000ff} />
      </line>
    </group>
  );
};
interface CurveProps extends LinesProps {
  currentDept: number;
  depth: number;
  alpha: number;
}

const CurveOrLine: FC<CurveProps> = ({ x1, x2, y1, y2, currentDept, depth, alpha }) => {

  if (currentDept === depth) {
    return <Line x1={x1} x2={x2} y1={y1} y2={y2} />;
  }

  return <Curve x1={x1} x2={x2} y1={y1} y2={y2} currentDept={currentDept + 1} depth={depth} alpha={alpha} />;
};

const Curve: FC<CurveProps> = ({ x1, x2, y1, y2, currentDept, depth, alpha }) => {

  if (currentDept === depth) {
    return <Line x1={x1} x2={x2} y1={y1} y2={y2} />;
  }

  const xThird = (x2 - x1) / 3,
    yThird = (y2 - y1) / 3;

  const xa = x1 + xThird,
    ya = y1 + yThird,
    xc = x2 - xThird,
    yc = y2 - yThird,
    xb = xa + (xc - xa) * Math.cos(-alpha) - (yc - ya) * Math.sin(-alpha),
    yb = ya + (yc - ya) * Math.cos(-alpha) + (xc - xa) * Math.sin(-alpha);
  return (
    <>
      <CurveOrLine key={x1} x1={x1} y1={y1} x2={xa} y2={ya} alpha={alpha} depth={depth} currentDept={currentDept} />
      <CurveOrLine key={xa} x1={xa} y1={ya} x2={xb} y2={yb} alpha={alpha} depth={depth} currentDept={currentDept} />
      <CurveOrLine key={x2} x1={xb} y1={yb} x2={xc} y2={yc} alpha={alpha} depth={depth} currentDept={currentDept} />
      <CurveOrLine key={xc} x1={xc} y1={yc} x2={x2} y2={y2} alpha={alpha} depth={depth} currentDept={currentDept} />
    </>
  );
};

const DrawKotchCurve: FC = () => {
  const { viewport } = useThree();
  const depth = 5;
  const alpha = Math.PI / 3;

  const x1 = (viewport.width / 100) * 3 - 10;
  const len = viewport.width - (x1 * 2);
  const x2 = x1 + len;
  const y1 = viewport.height * 7 / 8;
  const y2 = y1;
  return (
    <CurveOrLine x1={x1} x2={x2} y1={y1} y2={y2} depth={depth} currentDept={0} alpha={alpha} />
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
        <DrawKotchCurve />
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
