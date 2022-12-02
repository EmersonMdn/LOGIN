//process.env
//MODO, DEBUG, PUERTO
// MODO=development DEBUG=true PUERTO=8080

const dotenv = require("dotenv");
const Yargs = require("yargs/yargs");
const argv = process.argv.slice(2);

const result = Yargs(argv)
  .alias({ d: "entorno" })
  .default({ entorno: "production" }).argv;

dotenv.config({
  path: result.d == "development" ? "./development.env" : "./production.env",
});

const modo = process.env.MODO || "prod";
const debug = process.env.DEBUG === "true";
const puerto = Number(process.env.PUERTO ?? 0);
console.log({ modo, debug, puerto });
