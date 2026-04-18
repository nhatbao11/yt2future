import { Router } from 'express';
import {
  getPublishedServiceBySlug,
  listPublishedServices,
} from '../../controllers/serviceController.js';
import { validateParams } from '../../middlewares/validate.js';
import { serviceSlugParamsSchema } from './serviceContentSchema.js';

const router = Router();

router.get('/', listPublishedServices);
router.get('/:slug', validateParams(serviceSlugParamsSchema), getPublishedServiceBySlug);

export default router;
