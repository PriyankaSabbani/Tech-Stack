const mongoose = require('mongoose');

const expenseCategorySchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('ExpenseCategory', expenseCategorySchema);