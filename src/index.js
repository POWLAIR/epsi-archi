const express = require("express");
const app = express();
const productController = require("./product/product.controller");

app.get("/api/hello", (req, res) => {
  res.send("bonjour epsi");
});

app.use(productController);

app.listen(3010, () => {
  console.log("Serveur démarré sur le port 3010");
});
