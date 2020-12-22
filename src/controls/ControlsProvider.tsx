import React, { FC } from "react";
import { ControlsContext } from "./context";

const ControlsProvider: FC = ({ children }) => {

  return (
    <ControlsContext.Provider
      value={{
        recordControls: {
          duration: 21,
          fps: 25,
          filename: 'breathingDots'
        }
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};

export default ControlsProvider;
