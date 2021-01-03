import React, { FC, useRef, useEffect } from "react";
import { useThree } from "react-three-fiber";

export interface CameraProps { zoom: number, position?: [x: number, y: number, z: number] }
export const Camera: FC<CameraProps> = ({ zoom, position }) => {
  const { viewport } = useThree();

  if (!position) {
    position = [(viewport.width / 2), (viewport.height / 2), 5];
  }

  const camera = useRef();
  const { setDefaultCamera } = useThree();
  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void setDefaultCamera(camera.current!), []);
  return (
    <orthographicCamera zoom={zoom} position={position} ref={camera} onUpdate={self => self.updateProjectionMatrix()} />
  );
};
