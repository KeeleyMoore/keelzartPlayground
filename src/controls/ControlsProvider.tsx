import React, { FC, useReducer, useState } from "react";
import useCapture from "use-capture";
import CaptureAnimation from "./CaptureAnimation";
import { CaptureControlsState, ControlsContext } from "./context";

const initialState: CaptureControlsState = {
  captureEnabled: false,
  duration: 2,
  fps: 25,
  filename: 'clip'
};

type reducerDispatch = { field: string, value: number | string | boolean };

const reducer = (state: CaptureControlsState, { field, value }: reducerDispatch) => ({ ...state, [field]: value });

const ControlsProvider: FC = ({ children }) => {
  const [currentScene, setCurrentScene] = useState({});
  const [{ duration, fps, filename, captureEnabled }, dispatch] = useReducer(reducer, initialState);

  const dispatchInputUpdate = (field: string, value: number | string | boolean) => {
    dispatch({ field, value });
  };

  let [bind, startRecording] = useCapture({
    duration, fps, filename: filename ? filename : 'clip', framerate: 30, verbose: false, format: 'webm', motionBlurFrames: 0, showWidget: captureEnabled, children: undefined
  });

  console.log(currentScene);

  return (
    <ControlsContext.Provider
      value={{
        captureControls: {
          update: dispatchInputUpdate,
          state: { duration, fps, filename, captureEnabled },
          bind,
          startRecording,
        },
        currentScene,
        setCurrentScene
      }}
    >
      {children}
      <CaptureAnimation />
    </ControlsContext.Provider>
  );
};

export default ControlsProvider;
