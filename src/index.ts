import express from "express";
import productController from "./product/product.controller";
import orderController from "./order/presentation/order.controller";
import { initializeOrderContainer } from "./order/infrastructure/container";

// Initialisation du container
initializeOrderContainer();

const app = express();

// Ajout du middleware pour parser le JSON
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("bonjour epsi");
});

app.use(productController);
app.use(orderController);

app.listen(3010, () => {
  console.log("Serveur démarré sur le port 3010");
});
