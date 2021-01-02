import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import { BreathingDots, BreathingDotsProvider } from './scenes/breathingDots';
import { ControlsProvider } from './controls';
import { InterfaceProvider, Interface } from './interface';
import { Lines } from './scenes/lines';
import { KotchTwo } from './scenes/fractals/kotch';

const App: FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <InterfaceProvider>
        <ControlsProvider>
          <BreathingDotsProvider>
            <Router>
              <Interface />
              <Switch>
                <Route exact path="/breathing_dots">
                  <BreathingDots />
                </Route>
                <Route exact path="/lines">
                  <Lines />
                </Route>
                <Route exact path="/kotch">
                  <KotchTwo />
                </Route>
                <Redirect to="/breathing_dots" />
              </Switch>
            </Router>
          </BreathingDotsProvider>
        </ControlsProvider >
      </InterfaceProvider>
    </ThemeProvider>
  );
};

export default App;
