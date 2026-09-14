const Expense = require('../models/expenseModel.js');

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({
            eventId: req.params.eventId
        });
        if (expenses.length === 0) {
            return res.status(404).json({
                message: "Expenses not found!"
            });
        }
        res.status(200).json({
            message: "Expenses retrieved successfully!",
            expenses
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to retrieve expenses!",
            error: err.message
        });
    }
}

const createExpenses = async (req, res) => {
    try {
        const expense = await Expense.create({
            eventId: req.params.eventId,
            name: req.body.name,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date
        });
        res.status(201).json({
            message: "Expense created successfully!",
            expense
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to create expense!",
            error: err.message
        });
    }
}

const updateExpenses = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.expenseId, {
            name: req.body.name,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date
        }, { new: true });
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found!",
            });
        }
        res.status(200).json({
            message: "Expense updated successfully!",
            expense
        });

    }
    catch (err) {
        res.status(400).json({
            message: "Failed to update expense!",
            error: err.message
        });
    }
}

const deleteExpenses = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.expenseId);
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found!",
            });
        }
        res.status(200).json({
            message: "Expense deleted successfully!",
            expense
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to delete expense!",
            error: err.message
        });
    }
}
module.exports = { getExpenses, createExpenses, updateExpenses, deleteExpenses };