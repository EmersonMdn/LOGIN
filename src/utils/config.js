const dotenv = require("dotenv");
dotenv.config();

const Configs = {
  mongoDB: {
    url: process.env.MONGO_URL, ////? URL A LA CONEXION DE MONGODB
    options: {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

module.exports = Configs;
