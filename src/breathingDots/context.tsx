import React, { useContext } from 'react';
import { Waves } from './BreathingDots';

export interface BreathingDotsContextValue {
  tSlider: number;
  setTSlider: (t: number) => void;
  fSlider: number;
  setFSlider: (f: number) => void;
  wave: keyof typeof Waves;
  setWave: (wave: keyof typeof Waves) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const BreathingDotsContextDefaultValue = {} as BreathingDotsContextValue;
export const BreathingDotsContext = React.createContext(
  BreathingDotsContextDefaultValue
);

export type WithBreathingDotsContextProps = BreathingDotsContextValue;

export function withBreathingDotsContext<T extends WithBreathingDotsContextProps>(Component: React.ComponentType<T>) {
  return (
    props: Omit<T, keyof WithBreathingDotsContextProps>
  ): React.ReactElement => {
    return (
      <BreathingDotsContext.Consumer>
        {context => (
          <Component {...(props as T)} {...context} />
        )}
      </BreathingDotsContext.Consumer>
    );
  };
}

export const useBreathingDotsContext = (): WithBreathingDotsContextProps => useContext(BreathingDotsContext);
