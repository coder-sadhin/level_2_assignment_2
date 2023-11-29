import express from 'express';
import { OrderControllers } from '../Orders/order.controllers';
import { UserControllers } from './user.controllers';
// import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getUserByID);
router.put('/:userId', UserControllers.updateUserByID);
router.delete('/:userId', UserControllers.deleteUserByID);
router.put('/:userId/orders', OrderControllers.createOrder);
router.get('/:userId/orders', OrderControllers.getAllOrder);
router.get('/:userId/orders/total-price', OrderControllers.getTotalOrderPrice);

export const StudentRoute = router;
