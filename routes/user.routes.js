import express from 'express';
import { getUsers, getUserById, createUser, updateUser, patchUser, deleteUser } from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import roleMiddleware from '../middleware/role.middleware.js';

const router = express.Router();

router
    .route('/')
    // .get(authMiddleware, getUsers)
    .get(authMiddleware, roleMiddleware, getUsers)
    .post(authMiddleware, createUser)

router
    .route('/:id')
    .get(authMiddleware, getUserById)
    .put(authMiddleware, updateUser)
    .patch(authMiddleware, patchUser)
    .delete(authMiddleware, deleteUser)

export default router;