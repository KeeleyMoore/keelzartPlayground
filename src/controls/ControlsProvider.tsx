import React, { FC, useState } from "react";
import { ControlsContext } from "./context";

const ControlsProvider: FC = ({ children }) => {
  const [title, setTitle] = useState<string>('');
  const [controls, setControls] = useState<JSX.Element[]>();

  return (
    <ControlsContext.Provider
      value={{
        title,
        setTitle,
        controls,
        setControls
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};

export default ControlsProvider;
