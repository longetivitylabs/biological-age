const express = require("express");
const cors = require("cors");
const axios = require("axios");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;

app.use(cors());
app.use(express.json()); // <--- important!

const SANDBOX_CASHFREE_URL = "https://sandbox.cashfree.com/pg/orders";
const PROD_CASHFREE_URL = "https://api.cashfree.com/pg/orders";

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/create/cashfree/order", async (req, res) => {
 // const { amount, name, email, phone, description } = req.body;
  const {
  order_amount,
  order_currency = "INR",
  order_id,
  customer_details,
  order_meta,
  order_note
} = req.body;
  console.log('Received POST /create/cashfree/order', req.body);
 // const orderId = "order_" + Date.now();
 // const customerId = "CUST_" + Date.now();
 // const orderCurrency = "INR";

  try {
    const response = await axios.post(
      PROD_CASHFREE_URL,
      {
        order_amount: order_amount,
        order_currency: order_currency,
        order_id: order_id,
        customer_details,
        order_meta: {
          return_url: "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}"
        },
        order_note
      },
      {
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": process.env.CASHFREE_API_VERSION,
          "Content-Type": "application/json"
        }
      }
    );

    const sessionId = response.data.payment_session_id;
    res.json({ payment_session_id: sessionId });
    console.log('Received cashfree payment_session_id', sessionId);

  } catch (error) {
    console.error("Cashfree error:", error.response?.data || error.message);
    res.status(500).json({ error: "Payment session creation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  }).on('error', (err) => {
  console.error('Server failed to start:', err);
});
