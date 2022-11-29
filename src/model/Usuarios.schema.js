const mongoose = require("mongoose");

const Usuarios = mongoose.model("usuarios", {
  username: String,
  password: String,
  email: String,
});

module.exports = Usuarios;
