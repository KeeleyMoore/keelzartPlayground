import React, { useContext } from 'react';

export interface InterfaceContextValue {
  title: string;
  setTitle: (title: string) => void;
}

const InterfaceContextDefaultValue = {} as InterfaceContextValue;
export const InterfaceContext = React.createContext(
  InterfaceContextDefaultValue
);

export type WithInterfaceContextProps = InterfaceContextValue;

export function withInterfaceContext<T extends WithInterfaceContextProps>(Component: React.ComponentType<T>) {
  return (
    props: Omit<T, keyof WithInterfaceContextProps>
  ): React.ReactElement => {
    return (
      <InterfaceContext.Consumer>
        {context => (
          <Component {...(props as T)} {...context} />
        )}
      </InterfaceContext.Consumer>
    );
  };
}

export const useInterfaceContext = (): WithInterfaceContextProps => useContext(InterfaceContext);
