import React, { FC } from "react";
import { Box, MenuItem, Select, Slider, Typography } from "@material-ui/core";

import { useTreeGeneratorContext } from "./context";
import { TreesPreset } from './types';
import { MenuSection } from "../../components";

export const LengthSliderControl: FC = () => {

  const { length, setLength } = useTreeGeneratorContext();
  return (
    <Box>
      <Typography gutterBottom variant="subtitle2">Segment Length</Typography>
      <Slider
        color="secondary"
        valueLabelDisplay="auto"
        value={length}
        min={2}
        max={20}
        onChange={(event, value) => setLength(value as number)}
      />
    </Box>
  );
};

export const SelectPreset: FC = () => {
  const { presets, setPreset } = useTreeGeneratorContext();

  return (
    <Box mb={2}>
      <Typography gutterBottom variant="subtitle2">Trees Presets</Typography>
      <Select
        fullWidth
        label="Wave"
        defaultValue=""
        onChange={(event) => setPreset(presets[event.target.value as keyof typeof presets] as TreesPreset)}
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

const TreeGeneratorControls: FC = () => (
  <MenuSection>
    <Typography gutterBottom>Tree Generator Controls</Typography>
    <SelectPreset />
    <LengthSliderControl />
  </MenuSection>
);

export default TreeGeneratorControls;
