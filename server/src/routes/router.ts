import express from 'express';
import auth from './authRouter';

const router = express.Router();

router.use('/auth', auth);

export default router;
