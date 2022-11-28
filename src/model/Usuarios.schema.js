const mongoose = require("mongoose");

const usuarios = mongoose.model("usuarios", {
  username: String,
  password: String,
  email: String,
});

module.exports = usuarios;
