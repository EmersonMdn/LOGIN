const parseArgs = require("minimist");

// const options = { default: { n: "eduardo", e: 24, v: "development" } };
const alias = { alias: { n: "nombre", e: "edad", v: "entorno" } };

const { _, entorno, edad } = parseArgs(process.argv.slice(2), alias);

console.log({
  otros: _,
  entorno,
  edad,
  todos: parseArgs(process.argv.slice(2), alias),
});

console.log(edad >= 18 ? "Mayor de edad" : "Menor de edad");
