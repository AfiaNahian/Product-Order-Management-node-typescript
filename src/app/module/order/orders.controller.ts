import { Request, Response } from 'express';
import { OrdersServices } from './orders.service';
import { Orders } from './orders.model';
import { Products } from '../product/products.model';
import OrderValidationSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // validating order data using zod
    const validatedOrderData = OrderValidationSchema.parse(orderData);
    const { productId, quantity: orderQuantity } = validatedOrderData;
    const product = await OrdersServices.createAnOrderDB(productId);

    if (product?.inventory.quantity < orderQuantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    } else {
      //
      if (product?.inventory.quantity !== 0) {
        const order = await Orders.create(validatedOrderData);
        //updateing the quantity of the product and stock status
        const updateProductQuantity = await Products.findByIdAndUpdate(
          { _id: product?._id },
          { $inc: { 'inventory.quantity': -orderQuantity } }, //Deducting from the inventory
          { new: true },
        );
        // after order if inventory = 0 , then instock = false
        if (updateProductQuantity?.inventory.quantity === 0) {
          await Products.findByIdAndUpdate(
            { _id: product?._id },
            { $set: { 'inventory.inStock': false } }, //when the inventory stock is 0 the stock will be set to false
            { new: true },
          );
        }
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: { order },
        });
      } else {
        const updateProductInventory = await Products.findByIdAndUpdate(
          { _id: product?._id },
          { $set: { 'inventory.inStock': false } }, //when the inventory is empty the stock will be set to false
          { new: true },
        );
        res.status(400).json({
          success: false,
          message: 'Insufficient quantity available in inventory',
        });
      }
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const fetchOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (
      req.query.hasOwnProperty('email') &&
      typeof email === 'string' &&
      email !== 'undefined'
    ) {
      // if the email is there we will fetch the order for that specific user
      const result = await OrdersServices.fetchOrderByEmailDB(email);

      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        });
      }
    } else {
      // this part of the code will show all the orders in the collection
      const result = await OrdersServices.fetchAllOrderDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  fetchOrder,
};
