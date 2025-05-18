import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./app/components/Header/pages/Header";
import { Provider } from "react-redux";
import { configureStoreWithMiddlewares } from "./app/store/store";
import { Auth0Provider } from "@auth0/auth0-react";
import routes from "./app/components/Private-Route/routes";
import FavoritesInitializer from "./features/favorites/api/FavoritesInitializer";
import { isLocalStorageAvailable } from "./app/utils/auth0-helper";

export function App() {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-svh">
      <Header />
      <FavoritesInitializer />
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
  
  // Get the appropriate redirect URI
  const getRedirectUri = () => {
    return window.location.origin.includes("netlify")
      ? "https://nutritionhub-app.netlify.app/dashboard"
      : `${window.location.origin}/dashboard`;
  };
  
  // Use localStorage if available, otherwise fall back to memory
  const cacheLocation = isLocalStorageAvailable() ? 'localstorage' : 'memory';
  
  return (
    <Auth0Provider
      domain="dev-j8r4za1686l0mkr7.uk.auth0.com"
      clientId="CERpYJbACTex2vjYNRYmX85eRKmvpHXO"
      useRefreshTokens
      useRefreshTokensFallback
      authorizationParams={{
        redirect_uri: getRedirectUri(),
        audience: "https://www.nutritionhub.com",
        scope: "openid profile email offline_access",
      }}
      cacheLocation={cacheLocation}
      auth0Client={{
        name: "nutrition-hub-app",
        version: "1.0.0"
      }}
      onRedirectCallback={(appState) => {
        // Handle redirect more explicitly to ensure it works on Safari iOS
        window.history.replaceState(
          {},
          document.title,
          appState?.returnTo || window.location.pathname
        );
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  );
}
