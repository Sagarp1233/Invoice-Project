// server.js or create-order.js
import express from "express";
import Razorpay from "razorpay";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
