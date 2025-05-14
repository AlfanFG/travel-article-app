import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Article from "./pages/article";
import AuthLayout from "./layout/auth-layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { PrivateRoute, AuthRoute } from "./middleware";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Category from "./pages/category";
import Comment from "./pages/comment";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "comment",
        element: <Comment />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: (
      <AuthRoute>
        <AuthLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default route;
