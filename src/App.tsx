import React, { FC } from 'react';
import { BreathingDots, BreathingDotsProvider } from './breathingDots';
import { ControlsProvider } from './controls';
import Controls from './controls/Controls';

const App: FC = () => {

  return (
    <ControlsProvider>
      <BreathingDotsProvider>
        <Controls />
        <BreathingDots />
      </BreathingDotsProvider>
    </ControlsProvider >
  );
};

export default App;
