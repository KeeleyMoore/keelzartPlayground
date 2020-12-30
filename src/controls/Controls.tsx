import { Divider } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { BreathingDotsControls } from '../scenes/breathingDots';
import { KotchControls } from '../scenes/fractals/kotch';
import CaptureControls from './CaptureControls';

const Controls: FC = () => {
  const location = useLocation();
  const breathingDotsSelected = location.pathname.startsWith('/breathing_dots');
  const kotchSelected = location.pathname.startsWith('/kotch');

  return (
    <>
      <CaptureControls />
      <Divider />
      {breathingDotsSelected && <BreathingDotsControls />}
      {kotchSelected && <KotchControls />}
    </>
  );
};

export default Controls;
