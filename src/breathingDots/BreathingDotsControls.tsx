import React, { FC } from "react";
import { Box, MenuItem, Select, Slider } from "@material-ui/core";

import { useBreathingDotsContext } from "./context";
import { waveMetadata, Waves } from './BreathingDots';
import { streamEnumMetadata } from "../util/type";

export const TSliderControl: FC = () => {
  const { tSlider, setTSlider } = useBreathingDotsContext();
  return (
    <Box width={200} mx={1}>
      <Slider
        value={tSlider}
        min={1}
        max={45}
        marks={[{ value: 25, label: 'default' }]}
        onChange={(event, value) => setTSlider(value as number)}
      />
    </Box>
  );
};

export const FSliderControl: FC = () => {
  const { fSlider, setFSlider } = useBreathingDotsContext();
  return (
    <Box width={200} mx={1}>
      <Slider
        value={fSlider}
        step={0.1}
        min={0.1}
        max={8}
        marks={[{ value: 3.8, label: 'default' }]}
        onChange={(event, value) => setFSlider(value as number)}
      />
    </Box>
  );
};

export const WaveSelect: FC = () => {
  const { wave, setWave } = useBreathingDotsContext();

  return (
    <Box width={100} mx={1}>
      <Select
        value={wave}
        onChange={(event) => setWave(event.target.value as keyof typeof Waves)}
      >
        {streamEnumMetadata(Waves, waveMetadata).map(({ key: wave, value: label }) => (
          <MenuItem key={wave} value={wave}>{label}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export const ZoomSliderControl: FC = () => {
  const { zoom, setZoom } = useBreathingDotsContext();
  return (
    <Box width={200} mx={1}>
      <Slider
        value={zoom}
        min={2}
        max={20}
        marks={[{ value: 20, label: 'default' }]}
        onChange={(event, value) => setZoom(value as number)}
      />
    </Box>
  );
};

const BreathingDotsControls: FC = () => (
  <>
    <TSliderControl />
    <FSliderControl />
    <WaveSelect />
    <ZoomSliderControl />
  </>
);

export default BreathingDotsControls;
