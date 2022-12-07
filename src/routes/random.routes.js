const router = require("express").Router();

const { fork } = require("child_process");
const child = fork("./src/utils/random.js");

router.get("/random", (req, res) => {
  const cant = req.query.cant || 100000000;

  child.on("random", (num) => {
    console.log("numero random del hijo: ", num);
    res.send(num);
  });

  child.send(cant);
});

module.exports = router;
