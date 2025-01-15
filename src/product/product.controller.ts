import express from "express";
const router = express.Router();

router.get("/api/products", (req, res) => {
  res.send("liste de produits");
});

export default router;
