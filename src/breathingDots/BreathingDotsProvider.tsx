import React, { FC, useEffect, useState } from "react";

import { BreathingDotsContext } from "./context";
import { WavePreset, Waves } from './types';

import presets from './presets.json';

const BreathingDotsProvider: FC = ({ children }) => {
  const [tSlider, setTSlider] = useState<number>(25);
  const [fSlider, setFSlider] = useState<number>(3.8);
  const [wave, setWave] = useState<keyof typeof Waves>('roundedSquare');
  const [zoom, setZoom] = useState<number>(20);
  const [preset, setPreset] = useState<WavePreset>(presets.default);

  useEffect(() => {
    setTSlider(preset.t);
    setFSlider(preset.f);
    setWave(preset.wave as keyof typeof Waves);
    setZoom(preset.zoom);
  }, [preset]);

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
        preset,
        setPreset
      }}
    >
      {children}
    </BreathingDotsContext.Provider>
  );
};

export default BreathingDotsProvider;
