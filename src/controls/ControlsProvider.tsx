import React, { FC, useState } from "react";
import useCapture from "use-capture";
import CaptureAnimation from "./CaptureAnimation";
import { ControlsContext } from "./context";

const ControlsProvider: FC = ({ children }) => {
  const [duration, setDuration] = useState(8);
  const [fps, setFps] = useState(25);
  const [filename, setFilename] = useState('');
  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [bind, startRecording] = useCapture({
    duration, fps, filename, framerate: 30, verbose: false, format: 'webm', motionBlurFrames: 0, showWidget: false, children: undefined
  });

  return (
    <ControlsContext.Provider
      value={{
        captureControls: {
          captureEnabled,
          setCaptureEnabled,
          setDuration,
          setFps,
          setFilename,
          bind,
          startRecording,
        }
      }}
    >
      {children}
      <CaptureAnimation />
    </ControlsContext.Provider>
  );
};

export default ControlsProvider;
