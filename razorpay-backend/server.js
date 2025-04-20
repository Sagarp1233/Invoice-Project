import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import sendInvoiceRoute from "./routes/sendInvoice.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:8080" }));
app.use(express.json());

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_yourkeyid",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "yourkeysecret",
});

app.use("/api", sendInvoiceRoute);

// Create Order
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
});



// Verify Payment Signature
app.post("/api/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({ verified: true });
    } else {
      return res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error("Signature verification error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

// Start server
app.listen(4000, () => {
  console.log("✅ Razorpay backend running at http://localhost:4000");
});
