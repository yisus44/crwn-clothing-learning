const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const enforce = require("express-sslify");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const compression = require("compression");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("./service-worker.js", (req, res) => {
  res.sendFile(path.resolver(__dirname, "..", "build", "service-worker.js"));
});

if (process.env.NODE_ENV === "production") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.use(compression);

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "mxn",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server up and running on port" + port);
});
