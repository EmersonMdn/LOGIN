const Yargs = require("yargs/yargs");

const options = {
  alias: {
    m: "modo",
    p: "puerto",
    d: "debug",
  },
  default: {
    modo: "production",
    puerto: 8080,
    debug: false,
  },
};

const argv = process.argv.slice(2);
const result = Yargs(argv);

const { modo, puerto, debug, _ } = result
  .boolean("debug")
  .alias(options.alias)
  .default(options.default).argv;
console.log({ modo, puerto, debug, otros: _ });

////////* MINIMIST ///////////////

// const parseArgs = require("minimist");

// const options = {
//   alias: {
//     m: "modo",
//     p: "puerto",
//     d: "debug",
//   },
//   default: {
//     modo: "production",
//     puerto: 8080,
//     debug: false,
//   },
// };

// const argv = process.argv.slice(2);
// const { modo, puerto, debug, _ } = parseArgs(argv, options);
// console.log({ modo, puerto, debug, otros: _ });
