import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";

import { Route, Routes, BrowserRouter } from "react-router-dom";
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
