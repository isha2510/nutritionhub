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

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/reports" element={<Labs />} />
        <Route path="/nutritionist" element={<Doctor />} />
        <Route path="/recipe-detail" element={<RecipeDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  const store = configureStoreWithMiddlewares();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
