import React, { FC, useState } from "react";
import { InterfaceContext } from "./context";

const InterfaceProvider: FC = ({ children }) => {

  const [title, setTitle] = useState<string>('');

  return (
    <InterfaceContext.Provider
      value={{
        title,
        setTitle
      }}
    >
      {children}
    </InterfaceContext.Provider>
  );
};

export default InterfaceProvider;
