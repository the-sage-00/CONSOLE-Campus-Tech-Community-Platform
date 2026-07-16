const mongoose = require('mongoose');

const cfUserSchema = new mongoose.Schema({
  handle: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('CFUser', cfUserSchema);