import { TProduct } from '../product/products.interface';
import { Products } from '../product/products.model';
import { Orders } from './orders.model';

//creating order
const createAnOrderDB = async (id: string) => {
  const orderedProduct = (await Products.findOne({ _id: id })) as TProduct;
  return orderedProduct;
};

//updating product quantity after creating a order
const updateProductQuantity = async (id: string, quantity: number) => {
  const updateProductInventory = await Products.findByIdAndUpdate(
    { _id: id },
    { $inc: { 'inventory.quantity': -quantity } },
    { new: true },
  );

  return updateProductInventory;
};

//fetching all orders
const fetchAllOrderDB = async () => {
  const result = await Orders.find();
  return result;
};

//fetching order by email
const fetchOrderByEmailDB = async (query: string) => {
  const result = await Orders.find({
    email: query,
  });
  return result;
};

export const OrdersServices = {
  createAnOrderDB,
  fetchAllOrderDB,
  fetchOrderByEmailDB,
  updateProductQuantity,
};
