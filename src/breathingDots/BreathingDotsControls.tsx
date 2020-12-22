import React, { FC } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Slider, Typography } from "@material-ui/core";

import { useBreathingDotsContext } from "./context";
import { waveMetadata } from './BreathingDots';
import { WavePreset, Waves } from './types';
import { streamEnumMetadata } from "../util/type";
import presets from './presets.json';

export const TSliderControl: FC = () => {
  const { tSlider, setTSlider } = useBreathingDotsContext();
  return (
    <Box>
      <Typography gutterBottom>T</Typography>
      <Slider
        valueLabelDisplay="auto"
        value={tSlider}
        min={1}
        max={45}
        onChange={(event, value) => setTSlider(value as number)}
      />
    </Box>
  );
};

export const FSliderControl: FC = () => {
  const { fSlider, setFSlider } = useBreathingDotsContext();
  return (

    <Box>
      <Typography gutterBottom>F</Typography>
      <Slider
        valueLabelDisplay="auto"
        value={fSlider}
        step={0.1}
        min={0.1}
        max={8}
        onChange={(event, value) => setFSlider(value as number)}
      />
    </Box>
  );
};

export const WaveSelect: FC = () => {
  const { wave, setWave } = useBreathingDotsContext();

  return (
    <FormControl margin="normal">
      <InputLabel id="wave-select-label">Wave Type</InputLabel>
      <Select
        labelId="wave-select-label"
        label="Wave"
        value={wave}
        onChange={(event) => setWave(event.target.value as keyof typeof Waves)}
      >
        {streamEnumMetadata(Waves, waveMetadata).map(({ key: wave, value: label }) => (
          <MenuItem key={wave} value={wave}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export const WavePresetSelect: FC = () => {
  const { setPreset } = useBreathingDotsContext();

  return (
    <FormControl margin="normal">
      <InputLabel id="wave-preset-select-label">Wave Presets</InputLabel>
      <Select
        labelId="wave-preset-select-label"
        label="Wave"
        defaultValue=""
        onChange={(event) => setPreset(presets[event.target.value as keyof typeof presets] as WavePreset)}
      >
        {Object.entries(presets).map(([key, preset]) => {

          return (
            <MenuItem key={key} value={key}>{preset.label}</MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const ZoomSliderControl: FC = () => {
  const { zoom, setZoom } = useBreathingDotsContext();
  return (
    <Box>
      <Typography gutterBottom>Zoom</Typography>
      <Slider
        valueLabelDisplay="auto"
        value={zoom}
        min={2}
        max={20}
        onChange={(event, value) => setZoom(value as number)}
      />
    </Box>
  );
};

export const CopyInputValues = () => {

  const { zoom, fSlider, tSlider, wave } = useBreathingDotsContext();
  const inputsJson = JSON.stringify({
    "zoom": zoom,
    "fSlider": fSlider,
    "tSlider": tSlider,
    "wave": wave,
    "label": ""
  });
  let element = document.createElement("input");
  element.setAttribute("value", inputsJson);
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  return (
    <Button>
      Copy Inputs
    </Button>
  );
};

const BreathingDotsControls: FC = () => (
  <Box mx={3} display="flex" flexDirection="column">
    <ZoomSliderControl />
    <WaveSelect />
    <TSliderControl />
    <FSliderControl />
    <WavePresetSelect />
    <CopyInputValues />
  </Box>
);

export default BreathingDotsControls;
