import { Router } from 'express';
import {
  createService,
  deleteService,
  getServiceAdmin,
  listServicesAdmin,
  updateService,
} from '../../controllers/serviceController.js';
import { validateBody, validateParams } from '../../middlewares/validate.js';
import { createServiceBodySchema, serviceIdParamsSchema } from './serviceContentSchema.js';

const router = Router();

router.get('/', listServicesAdmin);
router.get('/:id', validateParams(serviceIdParamsSchema), getServiceAdmin);
router.post('/', validateBody(createServiceBodySchema), createService);
router.put(
  '/:id',
  validateParams(serviceIdParamsSchema),
  validateBody(createServiceBodySchema),
  updateService
);
router.delete('/:id', validateParams(serviceIdParamsSchema), deleteService);

export default router;
