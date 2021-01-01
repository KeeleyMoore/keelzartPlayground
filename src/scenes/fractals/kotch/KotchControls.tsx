import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Slider, Typography } from '@material-ui/core';
import debounce from 'lodash/debounce';

import { useControlsContext } from "../../../controls";

const KotchControls: FC = () => {
  const { setCurrentScene } = useControlsContext();
  const [depth, setDepth] = useState<number>(4);
  const [length, setLength] = useState<number>(80);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSceneControls = useCallback(debounce((newDepth, newLength) => {
    setCurrentScene({ depth: newDepth, length: newLength });
  }, 500), []);

  useEffect(() => {
    setSceneControls(depth, length);
  }, [depth, length, setSceneControls]);

  return (
    <Box mx={3} my={1} display="flex" flexDirection="column">
      <Typography gutterBottom>Kotch Controls</Typography>
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
      />
    </Box>
  );
};

export default KotchControls;
