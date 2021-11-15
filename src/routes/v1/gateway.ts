import { Router } from 'express';

import { validateVendorOrderSubmission } from 'middleware/validation/vendor-submission.validator';
import { orderSubmission } from 'controllers/vendor-submission.controller';

const router = Router();

router.post('', [validateVendorOrderSubmission], orderSubmission);

export default router;
