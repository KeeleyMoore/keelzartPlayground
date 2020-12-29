import React, { useContext } from 'react';
import { SharedCanvasContext } from 'react-three-fiber';

export interface ControlsContextValue {
  captureControls: {
    captureEnabled: boolean;
    setCaptureEnabled: (use: boolean) => void;
    setDuration: (duration: number) => void;
    setFps: (fps: number) => void;
    setFilename: (filename: string) => void;
    bind: (context: SharedCanvasContext) => void;
    startRecording: () => void;
  }
}

const ControlsContextDefaultValue = {} as ControlsContextValue;
export const ControlsContext = React.createContext(
  ControlsContextDefaultValue
);

export type WithControlsContextProps = ControlsContextValue;

export function withControlsContext<T extends WithControlsContextProps>(Component: React.ComponentType<T>) {
  return (
    props: Omit<T, keyof WithControlsContextProps>
  ): React.ReactElement => {
    return (
      <ControlsContext.Consumer>
        {context => (
          <Component {...(props as T)} {...context} />
        )}
      </ControlsContext.Consumer>
    );
  };
}

export const useControlsContext = (): WithControlsContextProps => useContext(ControlsContext);
