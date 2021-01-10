import { Divider } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { BreathingDotsControls } from '../scenes/breathingDots';
import { KotchControls } from '../scenes/fractals/kotch';
import { CirclesControls } from '../scenes/fractals/circles';

import CaptureControls from './CaptureControls';

const Controls: FC = () => {
  const location = useLocation();
  const breathingDotsSelected = location.pathname.startsWith('/breathing_dots');
  const kotchSelected = location.pathname.startsWith('/kotch');
  const circlesSelected = location.pathname.startsWith('/circles');

  return (
    <>
      <CaptureControls />
      <Divider />
      {breathingDotsSelected && <BreathingDotsControls />}
      {kotchSelected && <KotchControls />}
      {circlesSelected && <CirclesControls />}
    </>
  );
};

export default Controls;
