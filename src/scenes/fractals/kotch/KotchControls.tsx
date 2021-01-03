import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, MenuItem, Slider, Select, Typography, Input, ListItemText, Checkbox, FormControlLabel } from '@material-ui/core';
import debounce from 'lodash/debounce';

import { kotchCurvePatterns } from './patterns';
import { useControlsContext } from "../../../controls";

export interface KotchControlsValue {
  depth: number, length: number, selectedPatterns: string[], overlap: boolean
}

const KotchControls: FC = () => {
  const { setCurrentScene } = useControlsContext();
  const [depth, setDepth] = useState<number>(4);
  const [length, setLength] = useState<number>(80);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>(['cross', 'squareMirrored', 'diamond']);
  const [overlap, setOverlap] = useState<boolean>(true);
  console.log(overlap);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSceneControls = useCallback(debounce((newDepth, newLength, patterns, overlap) => {
    setCurrentScene({ depth: newDepth, length: newLength, selectedPatterns: patterns, overlap });
  }, 500), []);

  useEffect(() => {
    setSceneControls(depth, length, selectedPatterns, overlap);
  }, [depth, length, selectedPatterns, overlap, setSceneControls]);

  const handlePatternSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedPatterns(event.target.value as string[]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverlap(event.target.checked);
  };

  return (
    <Box mx={3} my={1} display="flex" flexDirection="column">
      <Typography gutterBottom>Kotch Controls</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={overlap}
            onChange={handleCheckboxChange}
          />
        }
        label="Overlap"
      />
      <Select
        multiple
        value={selectedPatterns}
        onChange={handlePatternSelect}
        input={<Input />}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {Object.keys(kotchCurvePatterns).map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={selectedPatterns.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>

      {/*
      <Typography variant="subtitle2">Depth of curve</Typography>
      <Slider
        valueLabelDisplay="auto"
        value={depth}
        min={1}
        max={7}
        onChange={(event, value) => setDepth(value as number)}
      />
      <Typography variant="subtitle2">Length</Typography>
      <Slider
        valueLabelDisplay="auto"
        value={length}
        min={7}
        max={25}
        onChange={(event, value) => setLength(value as number)}
      /> */}
    </Box>
  );
};

export default KotchControls;
