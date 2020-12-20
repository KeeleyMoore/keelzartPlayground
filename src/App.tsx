import React, { FC } from 'react';
import { BreathingDots } from './breathingDots';
import { ControlsProvider } from './controls';
import Controls from './controls/Controls';

const App: FC = () => {
  return (
    <ControlsProvider>
      <Controls />
      <BreathingDots />
    </ControlsProvider>
  );
};

export default App;
