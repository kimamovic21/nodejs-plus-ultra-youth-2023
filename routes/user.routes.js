import express from 'express';
import { getUsers, getUserById, createUser, updateUser, patchUser, deleteUser } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.patch('/:id', patchUser);
router.delete('/:id', deleteUser);

// router
//     .route('/')
//     .get(getUsers)
//     .post(createUser);

// router
//     .route('/:id')
//     .get(getUserById)
//     .put(updateUser)
//     .delete(deleteUser)

export default router;