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

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
