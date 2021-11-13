import { Router } from 'express';

import { validateVendorOrderSubmission } from 'middleware/validation/order-submission.validator';
import { orderSubmission } from 'controllers/order-submission.controller';

const router = Router();

router.post('', [validateVendorOrderSubmission], orderSubmission);

export default router;
