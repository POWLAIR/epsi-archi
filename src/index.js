const express = require("express");
const app = express();

app.get("/api/hello", (req, res) => {
  res.send("bonjour epsi");
});

app.listen(3010, () => {
  console.log("Serveur démarré sur le port 3010");
});
