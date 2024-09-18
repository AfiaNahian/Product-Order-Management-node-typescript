import { Orders } from './orders.model';
import { TOrder } from './orders.interface';
const createAnOrderDB = async (orderData: TOrder) => {
  const result = await Orders.create(orderData);
  return result;
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
};
