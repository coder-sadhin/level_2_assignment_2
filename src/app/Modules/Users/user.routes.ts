import express from 'express';
import { UserControllers } from './user.controllers';
// import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getUserByID);
router.delete('/:userId', UserControllers.deleteUserByID);

export const StudentRoute = router;
