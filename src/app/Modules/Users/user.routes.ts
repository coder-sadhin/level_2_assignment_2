import express from 'express';
import { UserControllers } from './user.controllers';
// import { StudentControllers } from './student.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);

export const StudentRoute = router;
