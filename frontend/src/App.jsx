import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import AllExpenses from "./pages/AllExpenses";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/all" element={<AllExpenses />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path = "/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}
