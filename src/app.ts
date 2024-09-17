import express, { Request, Response } from "express";
import cors from "cors";

import { ProductRoutes } from "./app/module/products/products.route";
import { OrderRoutes } from "./app/module/orders/orders.route";

const app = express();

//use parsers
app.use(express.json());
app.use(express.text());
app.use(cors());

//products route
app.use("/api/products", ProductRoutes);

// order route
app.use("/api/orders", OrderRoutes);

//const port = 5000
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
