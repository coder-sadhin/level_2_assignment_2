import { TUser } from './user.interface';
import UserModel from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // if (await Student.isUserExits(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  const result = await UserModel.create(userData);

  // create instance

  // const student = new Student(studentData);
  // if (await student.isUserExits(studentData.id)) {
  //   throw new Error('User already exists');
  // }

  // const result = await student.save();

  return result;
};

export const UserServices = {
  createUserIntoDB,
};
