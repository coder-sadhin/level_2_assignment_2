import { Request, Response } from 'express';
import { orderValidationSchema } from '../Users/user.velidators';
import { OrderServices } from './order.service';
// import { orderValidationSchema } from '../Users/user.velidators';
// import { UserServices } from './user.service';
// import userValidationSchema from './user.velidators';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body.order;
    const zodPerseData = orderValidationSchema.parse(orderData);
    const result = await OrderServices.createOrderIntoDB(zodPerseData, userId);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Order creation failed',
      error: {
        code: 404,
        description: error.message || 'Order creation failed',
      },
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await OrderServices.getAllOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Order not found',
      error: {
        code: 404,
        description: error.message || 'Order not found',
      },
    });
  }
};

const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await OrderServices.getTotalOrderPriceFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Price calculate not possible',
      error: {
        code: 404,
        description: error.message || 'Price calculate not possible',
      },
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
  getTotalOrderPrice,
};
