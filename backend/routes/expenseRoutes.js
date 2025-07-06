const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.post("/addexpenses", auth, addExpense);
router.get("/expenses", auth, getExpenses);
router.put("/expenses/:id", auth, updateExpense);
router.delete("/expenses/:id", auth, deleteExpense);

module.exports = router;
