import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import AddContactForm from "./components/AddContactForm";
import HomePage from "./components/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage />
      </div>
    ),
  },
  {
    path: "/add-contact",
    element: (
      <div>
        <AddContactForm />
      </div>
    ),
  },
]);

export default router;
