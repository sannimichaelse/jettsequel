import { Request, Response, NextFunction } from 'express';
import { vendorOrderSubmission } from 'services/order-submission.service';
import { CustomError } from 'utils/response/custom-error/customer-error';

export const orderSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await vendorOrderSubmission(req.body)
    res.status(200).json(response)
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
