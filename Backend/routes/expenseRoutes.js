const express = require('express');
const router = express.Router();
const { getExpenses, createExpenses, updateExpenses, deleteExpenses } = require('../controllers/expenseController');
router.get('/:eventId', getExpenses);
router.post('/:eventId', createExpenses);
router.put('/:expenseId', updateExpenses);
router.delete('/:expenseId', deleteExpenses);
module.exports = router;