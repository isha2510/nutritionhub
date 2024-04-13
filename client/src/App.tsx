import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./app/components/Header/pages/Header";
import { Provider } from "react-redux";
import { configureStoreWithMiddlewares } from "./app/store/store";
import { Auth0Provider } from "@auth0/auth0-react";
import routes from "./app/components/Private-Route/routes";

export function App() {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-svh">
      <Header />
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
}

export function WrappedApp() {
  const store = configureStoreWithMiddlewares();
  return (
    <Auth0Provider
      domain="dev-j8r4za1686l0mkr7.uk.auth0.com"
      clientId="CERpYJbACTex2vjYNRYmX85eRKmvpHXO"
      useRefreshTokens
      useRefreshTokensFallback
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`,
        audience: "https://www.nutritionhub.com",
        scope: "openid profile email offline_access",
      }}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  );
}
