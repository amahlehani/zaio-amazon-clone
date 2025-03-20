const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51QMFoSGK9OvTzZm6dBdu4tZR4EqzTStqnRTIp1jBckaezm" +
    "VgIASKNOQniOPRN9VBCF3EccwX5Iaz2HSVGYy7fnDZ003lYIPlfb",
);

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hello World!"));

app.post("/payments/create", async (req, res) => {
  const total = req.body.total;

  console.log("payment request received ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "zar",
  });

  console.log("PaymentIntent created:", paymentIntent);

  res.status(201).send({clientSecret: paymentIntent.client_secret});
})

exports.api = functions.https.onRequest(app);
