import { Router } from 'express';

import { getCommissionRateBasedOnLocation } from 'controllers/commission-rate.controller';
import { validateCommissionRate } from 'middleware/validation/commission-rate.validator';

const router = Router();

router.post('', [validateCommissionRate], getCommissionRateBasedOnLocation);

export default router;
