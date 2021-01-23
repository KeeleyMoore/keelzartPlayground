import { Box, Button, Collapse } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TuneIcon from '@material-ui/icons/Tune';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { BreathingDotsControls } from '../scenes/breathingDots';
import { KotchControls } from '../scenes/fractals/kotch';
import { CirclesControls } from '../scenes/fractals/circles';

import CaptureControls from './CaptureControls';

const Controls: FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const location = useLocation();
  const breathingDotsSelected = location.pathname.startsWith('/breathing_dots');
  const kotchSelected = location.pathname.startsWith('/kotch');
  const circlesSelected = location.pathname.startsWith('/circles');

  return (
    <Box
      position="absolute"
      right={0}
      top={0}
      width={250}
      height="auto"
      maxHeight="100%"
      bgcolor="rgba(0,0,0,0.6)"
      zIndex={1202}
      color="#fff"
      overflow="hidden auto"
      borderLeft="1px solid rgba(255,255,255,0.1)"
      borderBottom="1px solid rgba(255,255,255,0.1)"
    >
      <Collapse in={open}>
        <CaptureControls />
        {breathingDotsSelected && <BreathingDotsControls />}
        {kotchSelected && <KotchControls />}
        {circlesSelected && <CirclesControls />}
      </Collapse>
      <Button
        fullWidth
        onClick={() => setOpen((prevState) => !prevState)}
        startIcon={open ? <KeyboardArrowUpIcon /> : <TuneIcon />}
      >
        Controls
      </Button>
    </Box>
  );
};

export default Controls;
