import { TUser } from './user.interface';
import UserModel from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // if (await UserModel.findOne({ userId: userData.userId })) {
  //   throw new Error('User already exists');
  // }
  if (await UserModel.isUserExits(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await UserModel.create(userData);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find().select('-password');
  return result;
};

const getUserByID = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const deleteUserByID = async (id: string) => {
  if (!(await UserModel.findOne({ userId: id }))) {
    throw new Error('User not exists');
  }
  const result = await UserModel.updateOne({ userId: id }, { isActive: false });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getUserByID,
  deleteUserByID,
};
