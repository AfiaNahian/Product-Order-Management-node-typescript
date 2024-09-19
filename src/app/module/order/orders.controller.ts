/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './orders.service';
import OrderValidationSchema from './orders.validation';

import { Products } from '../product/products.model';

//controller for making order
const createOrder = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const zodParsedOrderedData = OrderValidationSchema.parse(req.body);

    //find the ordered product
    const orderedProduct = await Products.findOne({
      _id: zodParsedOrderedData.productId,
    });

    if (orderedProduct !== null) {
      if (orderedProduct.inventory.quantity < zodParsedOrderedData.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient quantity in stock!',
        });
      }

      const result = await OrderServices.makeOrder(zodParsedOrderedData);

      if (result) {
        //updating the ordered product quantity
        const updatedQuantity = await Products.findByIdAndUpdate(
          orderedProduct?._id,
          {
            'inventory.quantity':
              orderedProduct.inventory.quantity - zodParsedOrderedData.quantity,
          },
          { new: true },
        );
        if (updatedQuantity !== null) {
          //check if the quantity became zero and change the inStock value
          if (updatedQuantity.inventory.quantity === 0)
            await Products.findByIdAndUpdate(
              orderedProduct?._id,
              {
                'inventory.inStock': false,
              },
              { new: true },
            );
        }
      }

      res.status(200).json({
        success: true,
        message: 'Order created successfully !',
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Could not make Order!',
      error: err.message,
    });
  }
};

//controller for getting all the orders and get order by email
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const orders = await OrderServices.getAllOrders(req.query);

      res.status(200).json({
        success: orders.length === 0 ? false : true,
        message:
          orders.length === 0
            ? `Orders not found`
            : `Orders fetched successfully for user email!`,
        data: orders,
      });
    } else {
      const orders = await OrderServices.getAllOrders();

      res.status(200).json({
        success: orders.length === 0 ? false : true,
        message:
          orders.length === 0
            ? `Orders not found`
            : `Orders fetched successfully!`,
        data: orders,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: `Something Went wrong`,
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
