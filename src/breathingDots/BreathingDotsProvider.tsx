import React, { FC, useState } from "react";

import { BreathingDotsContext } from "./context";
import { Waves } from './BreathingDots';

const BreathingDotsProvider: FC = ({ children }) => {
  const [tSlider, setTSlider] = useState<number>(25);
  const [fSlider, setFSlider] = useState<number>(3.8);
  const [wave, setWave] = useState<keyof typeof Waves>('roundedSquare');
  const [zoom, setZoom] = useState<number>(20);

  return (
    <BreathingDotsContext.Provider
      value={{
        tSlider,
        setTSlider,
        fSlider,
        setFSlider,
        wave,
        setWave,
        zoom,
        setZoom,
      }}
    >
      {children}
    </BreathingDotsContext.Provider>
  );
};

export default BreathingDotsProvider;
