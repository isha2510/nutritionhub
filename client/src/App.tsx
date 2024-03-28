import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./app/components/Header/Header";
import About from "./app/components/About/About";
import Dashboard from "./features/dashboard/components/Dashboard";
import RecipeDetail from "./features/recipes/components/RecipeDetails";
import { Provider } from "react-redux";
import { configureStoreWithMiddlewares } from "./app/store/store";
import Recipes from "./features/recipes/components/Recipes";
import Exercise from "./features/exercise/components/Exercise";
import Labs from "./features/labs/components/Labs";
import Doctor from "./features/doctor/components/Doctor";
import { Auth0Provider } from "@auth0/auth0-react";
import LandingPage from "./app/components/Landing Page/LandingPage";
import Profile from "./app/components/Profile/Profile";
import PrivateRoute from "./app/components/Private Route/PrivateRoute";

export function App() {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <Header />
      <div className="dark:bg-boxdark-2 dark:text-bodydark mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <PrivateRoute>
                <Recipes />
              </PrivateRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <PrivateRoute>
                <Exercise />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Labs />
              </PrivateRoute>
            }
          />
          <Route
            path="/nutritionist"
            element={
              <PrivateRoute>
                <Doctor />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipe-detail"
            element={
              <PrivateRoute>
                <RecipeDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
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
      authorizationParams={{
        redirect_uri: `${window.location.origin}/dashboard`,
        audience: "https://www.nutritionhub.com",
        scope: "openid profile email offline_access",
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
