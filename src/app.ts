import express, { Request, Response } from 'express';
import cors from 'cors';

import { ProductRoutes } from './app/module/product/products.route';
import { OrderRoutes } from './app/module/order/orders.route';

const app = express();

//use parsers
app.use(express.json());
app.use(express.text());
app.use(cors());

//products route
app.use('/api/products', ProductRoutes);

// order route
app.use('/api/orders', OrderRoutes);

//const port = 5000
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
//not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
export default app;
