let contenedor = [];

process.on("random", (num) => {
  console.log(num);
  for (let i = 0; i < num; i++) {
    const random = Math.floor(Math.random() * 1000);
    contenedor.push(random);
    process.send({ numero: random });
  }
});
