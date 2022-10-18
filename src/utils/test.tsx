import React from "react";
import { Provider } from "react-redux";
type ReduxProviderType = {
  children: React.ReactNode,
  reduxStore: any,
}
export const ReduxProvider = ({children, reduxStore}: ReduxProviderType) => <Provider store={reduxStore}>{children}</Provider>

export function setGlobalMatchers() {
  global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
}

