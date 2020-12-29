import React, { FC, useReducer } from "react";
import useCapture from "use-capture";
import CaptureAnimation from "./CaptureAnimation";
import { CaptureControlsState, ControlsContext } from "./context";

const initialState: CaptureControlsState = {
  captureEnabled: false,
  duration: 8,
  fps: 25,
  filename: ''
};

type reducerDispatch = { field: string, value: number | string | boolean };

const reducer = (state: CaptureControlsState, { field, value }: reducerDispatch) => ({ ...state, [field]: value });

const ControlsProvider: FC = ({ children }) => {
  const [{ duration, fps, filename, captureEnabled }, dispatch] = useReducer(reducer, initialState);
  const dispatchInputUpdate = (field: string, value: number | string | boolean) => {
    console.log(field, value);
    dispatch({ field, value });
  };

  const [bind, startRecording] = useCapture({
    duration, fps, filename, framerate: 30, verbose: false, format: 'webm', motionBlurFrames: 0, showWidget: false, children: undefined
  });

  return (
    <ControlsContext.Provider
      value={{
        captureControls: {
          update: dispatchInputUpdate,
          state: { duration, fps, filename, captureEnabled },
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
