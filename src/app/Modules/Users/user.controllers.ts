import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.velidators';

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
      message: 'User not found',
      error: {
        code: 404,
        description: error.message || 'User not found',
      },
    });
  }
};

export const UserControllers = {
  createUser,
};
