import { Request, Response } from 'express';
import { OrdersServices } from './orders.service';
import { Products } from '../product/products.model';
import OrderValidationSchema from './orders.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const zodParsedOrderedData = OrderValidationSchema.parse(req.body);
    const result = await OrdersServices.createAnOrderDB(zodParsedOrderedData);

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
          //if the quantity became zero and change the inStock value
          if (updatedQuantity.inventory.quantity === 0)
            await Products.findByIdAndUpdate(
              orderedProduct?._id,
              { 'inventory.inStock': false },
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
      // if email matches, then will fetch the order for that specific user
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
      // get all orders
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
