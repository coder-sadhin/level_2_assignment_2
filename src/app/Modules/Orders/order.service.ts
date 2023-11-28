import { TOrder } from '../Users/user.interface';
import UserModel from '../Users/user.model';

const createOrderIntoDB = async (orderData: TOrder, userId: string) => {
  const id = Number(userId);
  if (!(await UserModel.findOne({ userId: id }))) {
    throw new Error('User not exists');
  }

  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $push: { orders: orderData } },
    { new: true },
  );
  return result;
};

const getAllOrderFromDB = async (userId: string) => {
  const id = Number(userId);
  if (!(await UserModel.findOne({ userId: id }))) {
    throw new Error('User not exists');
  }
  const result = await UserModel.findOne({ userId: id });
  return result?.orders;
};

const getTotalOrderPriceFromDB = async (userId: string) => {
  const id = Number(userId);
  const userData = await UserModel.findOne({ userId: id });

  if (!userData) {
    throw new Error('User not exists');
  }

  if (userData?.orders?.length === 0) {
    throw new Error('Orders not found');
  }

  const totalPrice = userData?.orders?.reduce(
    (accumulator: number, order) => accumulator + order.price,
    0,
  );

  return totalPrice;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getTotalOrderPriceFromDB,
};
