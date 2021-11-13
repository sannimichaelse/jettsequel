import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/customer-error';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validateCommissionRate = (req: Request, res: Response, next: NextFunction) => {
  let { commissionRate, saleItem } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  commissionRate = !commissionRate ? '': commissionRate

  if (validator.isEmpty(commissionRate)) {
    errorsValidation.push({ commissionRate: 'commissionRate is required' });
  }

  if (!saleItem) {
    errorsValidation.push({ saleItem: 'saleItem is required' });
  }

  if (saleItem && Object.keys(saleItem).length === 0) {
    errorsValidation.push({ saleItem: 'saleItem object cannot be empty' });
  }

  if (saleItem && !("saleId" in saleItem)) {
    errorsValidation.push({ saleId: 'saleId is required to get customers country and sale date' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Commission rate validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
