import { RouteObject } from "react-router-dom";
import Dashboard from "../../../features/dashboard/components/Dashboard";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../Landing Page/LandingPage";
import Recipes from "../../../features/recipes/components/Recipes";
import Exercise from "../../../features/exercise/components/Exercise";
import Labs from "../../../features/labs/components/Labs";
import Doctor from "../../../features/doctor/components/Doctor";
import RecipeDetail from "../../../features/recipes/components/RecipeDetails";
import About from "../About/About";
import Profile from "../Profile/Profile";
import AddRecipe from "../../../features/recipes/components/AddRecipe";
import EditRecipe from "../../../features/recipes/components/EditRecipe";
import AdminDashboard from "../../../features/admin/components/AdminDashboard";
import AdminRoute from "./AdminRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/recipes",
    element: (
      <PrivateRoute>
        <Recipes />
      </PrivateRoute>
    ),
  },
  {
    path: "/exercise",
    element: (
      <PrivateRoute>
        <Exercise />
      </PrivateRoute>
    ),
  },
  {
    path: "/reports",
    element: (
      <PrivateRoute>
        <Labs />
      </PrivateRoute>
    ),
  },
  {
    path: "/nutritionist",
    element: (
      <PrivateRoute>
        <Doctor />
      </PrivateRoute>
    ),
  },
  {
    path: "/recipes",
    element: (
      <PrivateRoute>
        <Recipes />
      </PrivateRoute>
    ),
  },
  {
    path: "/recipes/:id",
    element: (
      <PrivateRoute>
        <RecipeDetail />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-recipe",
    element: (
      <PrivateRoute>
        <AddRecipe />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit-recipe/:id",
    element: (
      <PrivateRoute>
        <EditRecipe />
      </PrivateRoute>
    ),
  },
  {
    path: "/about",
    element: (
      <PrivateRoute>
        <About />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
];

export default routes;
