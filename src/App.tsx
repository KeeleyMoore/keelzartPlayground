import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { BreathingDots, BreathingDotsProvider } from './breathingDots';
import { ControlsProvider } from './controls';
import { InterfaceProvider, Interface } from './interface';

const App: FC = () => {

  return (
    <ThemeProvider theme={theme}>

      <InterfaceProvider>
        <ControlsProvider>
          <BreathingDotsProvider>
            <Interface />
            <BreathingDots />
          </BreathingDotsProvider>
        </ControlsProvider >
      </InterfaceProvider>
    </ThemeProvider>
  );
};

export default App;
