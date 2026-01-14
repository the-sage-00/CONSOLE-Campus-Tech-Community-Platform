const mongoose = require('mongoose');

const lcUserSchema = new mongoose.Schema({
  handle: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('LCUser', lcUserSchema);
