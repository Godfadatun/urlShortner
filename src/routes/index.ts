import express from 'express';
import { encodeUrlRoute, decodeUrlRoute, staticUrlRoute } from './routes';
// import { createCommentRoute, getFilmCharactersRoute, getFilmRoute } from './comment';
// import { getTodoRoute, createTodoRoute, completeTodoRoute } from './routes';

const router = express.Router();

router.get('/', (_, res) => res.json({ success: true, message: 'User gateway v1 up.' }));

router.post('/encode', encodeUrlRoute);
router.post('/decode', decodeUrlRoute);
router.get('/static/:id', staticUrlRoute);

export default router;
