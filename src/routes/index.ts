import express from 'express';
// import { createCommentRoute, getFilmCharactersRoute, getFilmRoute } from './comment';
import { getTodoRoute, createTodoRoute, completeTodoRoute } from './ToDo';

const router = express.Router();

router.get('/', (_, res) => res.json({ success: true, message: 'User gateway v1 up.' }));

router.get('/encode', encodeUrlRoute);
router.post('/decode', decodeUrlRoute);
router.patch('/static/:id', completeTodoRoute);

export default router;
