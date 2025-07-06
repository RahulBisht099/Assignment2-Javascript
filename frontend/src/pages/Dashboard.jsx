import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF6666",
  "#8884d8",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [monthlyBudget, setMonthlyBudget] = useState(
    localStorage.getItem("monthlyBudget") || ""
  );
  const [budgetInput, setBudgetInput] = useState("");
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState("latest"); // 'latest' or 'oldest'

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );
  const remaining = monthlyBudget - totalExpenses;

  // Sort expenses based on selected option
  const sortedExpenses = [...expenses].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  // Check balance whenever expenses or monthlyBudget changes
  useEffect(() => {
    if (monthlyBudget && remaining <= 0) {
      showBalanceWarning();
    }
  }, [expenses, monthlyBudget, remaining]);

  const showBalanceWarning = () => {
    if (remaining === 0) {
      toast("💰 Your balance is now ZERO! Time to stop spending.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFA500",
          color: "#fff",
        },
      });
    } else if (remaining < 0) {
      toast.error(
        `💸 You're OVER budget by ₹${Math.abs(remaining)}! Stop spending NOW!`,
        {
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#FF3333",
            color: "#fff",
          },
        }
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleResetDashboard = () => {
    localStorage.removeItem("monthlyBudget");
    localStorage.removeItem("expenses");
    setMonthlyBudget("");
    setExpenses([]);
    setExpenseAmount("");
    setExpenseCategory("");
    setExpenseNote("");
    setEditIndex(null);
    toast.success("Dashboard reset! Set new monthly budget.");
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("monthlyBudget", budgetInput);
    setMonthlyBudget(budgetInput);
    setBudgetInput("");
    toast.success("Monthly budget set!");
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseAmount || !expenseCategory) return;

    const newExpense = {
      amount: Number(expenseAmount),
      category: expenseCategory,
      note: expenseNote,
      date: new Date().toLocaleString(),
    };

    let updatedExpenses;
    if (editIndex !== null) {
      updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setEditIndex(null);
      toast.success("Expense updated!");
    } else {
      updatedExpenses = [...expenses, newExpense];
      toast.success("Expense added!");
    }

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    setExpenseAmount("");
    setExpenseCategory("");
    setExpenseNote("");
  };

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
    toast.success("Expense deleted!");
  };

  const handleEdit = (index) => {
    const exp = expenses[index];
    setExpenseAmount(exp.amount);
    setExpenseCategory(exp.category);
    setExpenseNote(exp.note || "");
    setEditIndex(index);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const getCategoryData = () => {
    const categoryMap = {};
    expenses.forEach((exp) => {
      if (categoryMap[exp.category]) {
        categoryMap[exp.category] += exp.amount;
      } else {
        categoryMap[exp.category] = exp.amount;
      }
    });

    return Object.keys(categoryMap).map((category) => ({
      name: category,
      value: categoryMap[category],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "User"}👋
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleResetDashboard}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Reset Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Monthly Budget */}
      {!monthlyBudget ? (
        <div
          className="flex justify-center items-center min-h-[70vh] bg-cover bg-center rounded-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9uZXl8ZW58MHx8MHx8fDA%3D')",
          }}
        >
          <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-xl w-full">
            <form onSubmit={handleBudgetSubmit}>
              <label className="block text-2xl font-bold text-gray-800 mb-6 text-center">
                Set Your Monthly Budget (₹)
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="number"
                  required
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="flex-1 border p-3 rounded text-lg"
                  placeholder="Enter amount"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-lg cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
            <div className="mt-8 text-center text-gray-700 italic text-lg">
              "Budgeting isn't about limiting yourself — it's about making room
              for the things that truly matter."
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Budget Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Budget
              </h2>
              <p className="text-2xl text-blue-600">₹ {monthlyBudget}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Total Expenses
              </h2>
              <p className="text-2xl text-red-500">₹ {totalExpenses}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Balance
              </h2>
              <p
                className={`text-2xl ${
                  remaining < 0
                    ? "text-red-600 animate-pulse"
                    : remaining === 0
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                ₹ {remaining}
              </p>
            </div>
          </div>

          {/* Add Expense Form */}
          <form
            onSubmit={handleAddExpense}
            className="bg-white p-4 rounded-lg shadow mb-6"
          >
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {editIndex !== null ? "Edit Expense" : "Add New Expense"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="number"
                placeholder="Amount (₹)"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Grocery">Grocery</option>
                <option value="Rent">Rent</option>
                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Fuel">Fuel</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Note (optional)"
                value={expenseNote}
                onChange={(e) => setExpenseNote(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 col-span-1 cursor-pointer"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </form>

          {/* History + Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expense History */}
            <div className="bg-white p-4 rounded-lg shadow h-fit">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  Expense History
                </h2>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border p-2 rounded text-sm"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
              {expenses.length === 0 ? (
                <p className="text-gray-500">No expenses added yet.</p>
              ) : (
                <ul className="space-y-3">
                  {sortedExpenses.map((exp, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <span className="font-medium">{exp.category}</span>
                        <br />
                        <span className="text-sm text-gray-500">
                          {exp.date}
                        </span>
                        <br />
                        {exp.note && (
                          <span className="text-sm italic text-gray-600">
                            "{exp.note}"
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-semibold">
                          ₹ {exp.amount}
                        </span>
                        <button
                          onClick={() => handleEdit(index)}
                          className="bg-green-400 hover:bg-green-500 text-black text-sm font-semibold px-3 py-1 rounded cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pie Chart */}
            {expenses.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow h-[350px]">
                <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
                  Spending Distribution
                </h2>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      fill="#8884d8"
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;