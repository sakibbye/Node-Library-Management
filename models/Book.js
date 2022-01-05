const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  status: String,
});

const Bookdb = mongoose.model("Bookdb", schema);

module.exports = Bookdb;
