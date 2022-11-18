const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store");
const app = express();
const port = 8080;

const SessionFileStore = FileStore(session);
app.use(
  session({
    secret: "4rfs11dfbc0",
    store: new SessionFileStore({ path: "./session", ttl: 60, retries: 0 }),
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  // req.session.contador
  // req.session.usuario
  if (req.session.contador) {
    req.session.contador++;
    res.send(
      `Bienvenido/a de nuevo ${req.query.user}!!!, has accedido ${req.session.contador} veces `
    );
  } else {
    req.session.contador = 1;
    if (req.query) req.session.user = req.query.user;
    res.send(`Bienvenido/a ${req.query.user}!!!`);
  }
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
