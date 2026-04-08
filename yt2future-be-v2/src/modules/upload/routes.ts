import { Router } from 'express';
import { uploadFile } from '../../controllers/uploadController.js';
import { verifyToken, isCTVOrAdmin } from '../../middlewares/authMiddleware.js';

const router = Router();

router.post('/', verifyToken, isCTVOrAdmin, uploadFile);

export default router;
