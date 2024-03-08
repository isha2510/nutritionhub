/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";

import { RootState, configureStoreWithMiddlewares } from "../app/store/store";

type CustomRenderOptions = {
  preloadedState?: RootState;
  routeHistory?: Array<string>;
  initialRouteIndex?: number; // index in the routeHistory array to start the test
  renderOptions?: Omit<RenderOptions, "wrapper">;
};

type CustomRenderResult = RenderResult;

function render(
  ui: ReactElement,
  { preloadedState = {}, ...renderOptions }: CustomRenderOptions = {},
): CustomRenderResult {
  function Wrapper({ children }: { children?: ReactNode }): ReactElement {
    const store = configureStoreWithMiddlewares(preloadedState);

    return <Provider store={store}>{children}</Provider>;
  }

  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  return { ...renderResult };
}

// re-export everything
export * from "@testing-library/react";

// override render method and export history
export { render };
