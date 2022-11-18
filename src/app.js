const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: "7fhj383hf26o1i7",
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://EmersonMdn:Loque.321@cluster0.0llifr1.mongodb.net/sesiones?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
      ttl: 600,
    }),
    resave: false,
    saveUninitialized: false,
  })
);

//SETTINGS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(require("./routes/logs.routes.js"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
