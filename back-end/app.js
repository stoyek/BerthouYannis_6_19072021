const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path')

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");

mongoose
  .connect(
    "mongodb+srv://Yannouf:15Mars1994@occours.1ajgm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images' )));

module.exports = app;
