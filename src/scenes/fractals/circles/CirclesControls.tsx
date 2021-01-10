import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel, Slider } from '@material-ui/core';
import debounce from 'lodash/debounce';

import { useControlsContext } from "../../../controls";

export interface CirclesControlsValue {
  colorMin: number, colorMax: number, zColor: number, x: boolean, y: boolean
}

const CirclesControls: FC = () => {
  const { setCurrentScene } = useControlsContext();
  const [colorMin, setColorMin] = useState<number>(-60);
  const [colorMax, setColorMax] = useState<number>(20);
  const [zColor, setZColor] = useState<number>(20);

  const [x, setX] = useState<boolean>(true);
  const [y, setY] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSceneControls = useCallback(debounce((newColorMax, newColorMin, newZColor, newX, newY) => {
    setCurrentScene({ colorMax: newColorMax, colorMin: newColorMin, zColor: newZColor, x: newX, y: newY });
  }, 500), []);

  useEffect(() => {
    setSceneControls(colorMax, colorMin, zColor, x, y);
  }, [colorMax, colorMin, zColor, x, y, setSceneControls]);

  return (
    <Box mx={3} my={1} display="flex" flexDirection="column">
      <Typography gutterBottom>Circle Controls</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={x}
            onChange={(event) => setX(event.target.checked)}
          />
        }
        label="Repeat X"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={y}
            onChange={(event) => setY(event.target.checked)}
          />
        }
        label="Repeat Y"
      />
      <Typography variant="subtitle2">Min Colour range</Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value + 60}
        value={colorMin}
        min={-60}
        max={0}
        onChange={(event, value) => setColorMin(value as number)}
      />
      <Typography variant="subtitle2">Max Colour range</Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value + 50}
        value={colorMax}
        min={-50}
        max={50}
        onChange={(event, value) => setColorMax(value as number)}
      />
      <Typography variant="subtitle2">Z Colour range</Typography>
      <Slider
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => value + 40}
        value={zColor}
        min={-40}
        max={200}
        onChange={(event, value) => setZColor(value as number)}
      />
    </Box>
  );
};

export default CirclesControls;
