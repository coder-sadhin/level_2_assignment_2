import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { userValidationSchema } from './user.velidators';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body.user;
    const zodPerseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodPerseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User created failed',
      error: {
        code: 404,
        description: error.message || 'User created failed',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getUserByID(userId);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

const updateUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const result = await UserServices.updateUserByID(userId, updateData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'User update not possible',
      error: {
        code: 404,
        description: error.message || 'User update not possible',
      },
    });
  }
};

const deleteUserByID = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserByID(userId);
    res.status(200).json({
      success: true,
      message: 'User Successfully Deleted',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Delete not possible',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getUserByID,
  deleteUserByID,
  updateUserByID,
};
