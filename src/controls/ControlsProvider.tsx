import React, { FC, useState } from "react";
import { ControlsContext } from "./context";

const ControlsProvider: FC = ({ children }) => {

  return (
    <ControlsContext.Provider
      value={{
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};

export default ControlsProvider;
