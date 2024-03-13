import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/Home.jsx";
import { Contact } from "./components/Contact.jsx";
import { Products } from "./components/Products.jsx";
import { Basket } from "./components/Basket.jsx";
import { Login } from "./components/Login.jsx";
import { RootLayout } from "./components/RootLayout.jsx";
import { ProductDetails } from "./components/ProductDetails.jsx";
import { UserProvider } from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":id",
            element: <ProductDetails />,
          },
        ],
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "Login",
        element: <Login />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
  // </React.StrictMode>
);
