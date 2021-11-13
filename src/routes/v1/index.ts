import { Router } from 'express';

import rates from './rates';
import gateway from './gateway';

const router = Router();

router.use('/rates', rates);
router.use('/gateway', gateway);


export default router;
