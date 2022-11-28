const Configs = {
  mongoDB: {
    url: "mongodb+srv://EmersonMdn:Loque.321@cluster0.0llifr1.mongodb.net/coder?retryWrites=true&w=majority",
    options: {
      serverSelectionTimeoutMS: 5000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};

module.exports = Configs;
