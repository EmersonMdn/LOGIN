import express from "express";

const app = express();
const PORT = process.argv[2] || 8080;

app.get("/", (req, res) => {
  res.send(`En linea en puerto ${PORT} con Nginx`);
});

app.listen(PORT, () => {
  console.log("En linea en puerto", PORT);
});
