import logo from "./logo.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import HomePage from "./components/HomePage";
import router from "./routes";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import AddContactForm from "./components/AddContactForm";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-contact" element={<AddContactForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
