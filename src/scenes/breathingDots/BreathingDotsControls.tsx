import React, { FC } from "react";
import { Box, Button, MenuItem, Select, Slider, Typography } from "@material-ui/core";

import { useBreathingDotsContext } from "./context";
import { waveMetadata } from './BreathingDots';
import { WavePreset, Waves } from './types';
import { streamEnumMetadata, CopyInputValues } from "../../util";
import presets from './presets.json';
import { MenuSection } from "../../components";

export const TSliderControl: FC = () => {
  const { tSlider, setTSlider } = useBreathingDotsContext();
  return (
    <Box>
      <Typography gutterBottom variant="subtitle2">T</Typography>
      <Slider
        color="secondary"
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
    <Box mb={2}>
      <Typography gutterBottom variant="subtitle2">F</Typography>
      <Slider
        color="secondary"
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

export const ZoomSliderControl: FC = () => {

  const { zoom, setZoom } = useBreathingDotsContext();
  return (
    <Box>
      <Typography gutterBottom variant="subtitle2">Zoom</Typography>
      <Slider
        color="secondary"
        valueLabelDisplay="auto"
        value={zoom}
        min={2}
        max={20}
        onChange={(event, value) => setZoom(value as number)}
      />
    </Box>
  );
};

export const WaveSelect: FC = () => {
  const { wave, setWave } = useBreathingDotsContext();

  return (
    <Box mb={2}>
      <Typography gutterBottom variant="subtitle2">Wave Type</Typography>
      <Select
        fullWidth
        label="Wave"
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
export const WavePresetSelect: FC = () => {
  const { setPreset } = useBreathingDotsContext();

  return (
    <Box mb={2}>
      <Typography gutterBottom variant="subtitle2">Wave Presets</Typography>
      <Select
        fullWidth
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
    </Box>
  );
};

const BreathingDotsControls: FC = () => {
  const { zoom, fSlider, tSlider, wave } = useBreathingDotsContext();
  const getInputValues = () => JSON.stringify({
    "zoom": zoom,
    "f": fSlider,
    "t": tSlider,
    "wave": wave,
    "label": ""
  });

  return (
    <MenuSection>
      <Typography gutterBottom>Breathing Dots Controls</Typography>
      <ZoomSliderControl />
      <WaveSelect />
      <TSliderControl />
      <FSliderControl />
      <WavePresetSelect />
      <Button onClick={() => CopyInputValues(getInputValues())}>
        Copy Inputs
      </Button>
    </MenuSection>
  );
};

export default BreathingDotsControls;
