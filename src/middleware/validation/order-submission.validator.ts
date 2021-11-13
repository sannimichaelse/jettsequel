import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/customer-error';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validateVendorOrderSubmission = (req: Request, res: Response, next: NextFunction) => {
  let { sale } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  if (!sale) {
    errorsValidation.push({ sale: 'sale is required' });
  }

  if (!sale.customer) {
    errorsValidation.push({ saleCustomer: 'saleCustomer is required' });
  }

  console.log("SALE__________")
  console.log(sale)
  console.log(sale.customer)

  let { email } = sale.customer

  email = !email ? '' : email;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ saleCustomerEmail: 'saleCustomerEmail is invalid' });
  }

  if (errorsValidation.length > 0) {
    const customError = new CustomError(400, 'Validation', 'Vendor order submission validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};
