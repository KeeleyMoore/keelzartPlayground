import React, { useContext } from 'react';
import { SharedCanvasContext } from 'react-three-fiber';

export interface CaptureControlsState {
  captureEnabled: boolean;
  duration: number;
  fps: number;
  filename: string;
}

export interface ControlsContextValue {
  captureControls: {
    update: (field: string, value: number | string | boolean) => void;
    state: CaptureControlsState;
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
