import React, { useContext } from 'react';

export interface ControlsContextValue {
  title: string;
  setTitle: (title: string) => void;
  //TODO:: Create types for these control objects
  controls?: any[];
  setControls: (controls?: any[]) => void;
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