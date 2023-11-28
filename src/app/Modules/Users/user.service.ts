import { TUser } from './user.interface';
import UserModel from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await UserModel.findOne({ userId: userData.userId })) {
    throw new Error('User already exists');
  }
  const result = await UserModel.create(userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
