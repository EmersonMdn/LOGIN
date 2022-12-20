const express = require("express");
const app = express();
const PORT = process.argv[2] || 8080;
const cluster = require("cluster");
const { cpus } = require("os");
const cpuLength = cpus().length;
const method = process.argv[3] || "fork";

if (method == "CLUSTER" || method == "cluster") {
  if (cluster.isPrimary) {
    //? MOTODO CLUSTER
    console.log(`Primary PID: ${process.pid}`);

    for (let i = 0; i < cpuLength; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker PID: ${worker.process.pid} just died`);
      cluster.fork(); // nuevo worker
    });
  } else {
    app.get("/", (req, res) => {
      res.send(
        `   Servidor en puerto ${PORT} <br> 
            PID: ${process.pid}<br> 
            Procesadores trabajando: ${cpuLength} <br>
            ${new Date().toLocaleString()}`
      );
    });
    app.listen(PORT, () =>
      console.log(`Puerto: ${PORT}, worker PID: ${process.pid}!`)
    );
  }
} else {
  //? MOTODO FORK
  app.get("/", (req, res) => {
    res.send(
      `Servidor en puerto ${PORT} <br> PID: ${
        process.pid
      } <br> ${new Date().toLocaleString()}`
    );
  });

  app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
  });
}
