import express from "express";
// import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import ErrorResponse from "./utils/errorResponse";
import { resource404Error } from "./utils/errorObject";
import errorHandler from "./middlewares/errorHandler";

// import routes
import categories from "./routers/categories";
import products from "./routers/products";
import customers from "./routers/customers";
import admins from "./routers/admins";
import auth from "./routers/auth";
import orders from "./routers/orders";
import collections from "./routers/collections";
import uploadMiddleware from "./middlewares/multerMid";
import fs from "fs";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const Key: any = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(Key, {
  apiVersion: "2024-06-20",
});

const pathimg = "./uploads";

const app = express();

// Enable CORS
app.use(cors());

// Set HTTP Hseaders
app.use(helmet());

// Set Rate Limit
const limiter = rateLimit({
  windowMs: 7 * 60 * 1000, // 7 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// process.env.NODE_ENV === "development" && app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);
app.use("/api/v1/orders", orders);
app.use("/api/v1/customers", customers);
app.use("/api/v1/auth", auth);
app.use("/api/v1/admins", admins);
app.use("/api/v1/collection", collections);

app.post("/api/upload", uploadMiddleware, async (req, res) => {
  // Handle the uploaded files
  const files: any = req.files;

  // Process and store the files as required
  // For example, save the files to a specific directory using fs module
  files.forEach((file: any) => {
    const filePath = `${pathimg}/${file.filename}`;
    fs.rename(file.path, filePath, (err: any) => {
      if (err) {
        // Handle error appropriately and send an error response
        return res.status(500).json({ error: "Failed to store the file" });
      }
    });
  });

  // Send an appropriate response to the client
  res.status(200).json({ message: "File upload successful" });
});

app.get("/images/:filename", function (request, response) {
  response.sendFile(request.params.filename, { root: pathimg });
});

//****************** stripe Payment   ********************** */
app.get("/api/v1/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/api/v1/create-payment-intent", async (req, res) => {
  try {
    const totalPrice: string | undefined = req.body.totalPrice;
    const email: string | undefined = req.body.email;
    const name: string | undefined = req.body.name;

    const customer = await stripe.customers.create({
      email: email,
      name: name,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      currency: "EUR",
      amount: Number(totalPrice) * 100 ?? 1,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e: any) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// 404 error if route not found
app.all("*", (req, res, next) =>
  next(new ErrorResponse(resource404Error("route"), 404))
);

app.use(errorHandler);

export default app;
