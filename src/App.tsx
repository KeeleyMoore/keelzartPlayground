import React, { FC } from 'react';
import { BreathingDots, BreathingDotsProvider } from './breathingDots';
import { ControlsProvider } from './controls';
import { InterfaceProvider, Interface } from './interface';

const App: FC = () => {

  return (
    <InterfaceProvider>
      <ControlsProvider>
        <BreathingDotsProvider>
          <Interface />
          <BreathingDots />
        </BreathingDotsProvider>
      </ControlsProvider >
    </InterfaceProvider>
  );
};

export default App;
