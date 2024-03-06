import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Dashboard from "./features/Dashboard/Dashboard";
import RecipeDetail from "./features/Dashboard/RecipeDetails";
import { Provider } from "react-redux";
import { configureStoreWithMiddlewares } from "./app/store";

export function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
