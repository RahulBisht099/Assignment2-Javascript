const Expense = require("../models/Expense");

// @desc   Add new expense
// @route  POST /api/addexpenses
exports.addExpense = async (req, res) => {
  try {

    const { amount, category, note } = req.body;

    const newExpense = new Expense({
      user: req.user.id,
      amount,
      category,
      note,
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Add Expense Error:", error); 
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc   Get all expenses for logged-in user
// @route  GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update an expense
// @route  PUT /api/expenses/:id
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const { amount, category, note } = req.body;

    expense.amount = amount;
    expense.category = category;
    expense.note = note;

    const updated = await expense.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Delete an expense
// @route  DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
