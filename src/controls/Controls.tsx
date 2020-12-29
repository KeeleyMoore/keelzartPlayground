import { Divider } from '@material-ui/core';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { BreathingDotsControls } from '../scenes/breathingDots';
import CaptureControls from './CaptureControls';

const Controls: FC = () => {
  const location = useLocation();
  const breathingDotsSelected = location.pathname.startsWith('/breathing_dots');

  return (
    <>
      <CaptureControls />
      <Divider />
      {breathingDotsSelected && <BreathingDotsControls />}
    </>
  );
};

export default Controls;
