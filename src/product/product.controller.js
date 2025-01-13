const express = require("express");
const router = express.Router();

router.get("/api/products", (req, res) => {
  res.send("liste de produits");
});

module.exports = router;
