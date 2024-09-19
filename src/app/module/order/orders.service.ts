import { TOrder } from './orders.interface';
import { Orders } from './orders.model';

//create an order
const makeOrder = async (orderData: TOrder) => {
  const result = await Orders.create(orderData);
  return result;
};

//get all the orders and get order by email
const getAllOrders = async (findOrder = {}) => await Orders.find(findOrder);

export const OrderServices = {
  makeOrder,
  getAllOrders,
};
