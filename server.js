const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_live_4BJANPRgYV2kgG", // Replace with your Razorpay Key ID
  key_secret: "EtX1z8oYAEBWMOwMRKw4HXJD", // Replace with your Razorpay Secret
});

app.post("/api/create-order", async (req, res) => {
  const { plan } = req.body;

  // Set amount based on plan
  let amount;
  if (plan === "pro") {
    amount = 199 * 100; // ₹199
  } else if (plan === "business") {
    amount = 499 * 100; // ₹499
  } else {
    amount = 100 * 100; // Default to ₹100
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    });
    res.json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).send("Something went wrong while creating the order");
  }
});

app.listen(3000, () => {
  console.log("✅ Razorpay server running on http://localhost:3000");
});
