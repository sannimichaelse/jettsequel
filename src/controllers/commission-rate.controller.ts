import { Request, Response, NextFunction } from 'express';
import { getRateBasedOnLocation } from 'services/commission-rate.service';
import { CustomError } from 'utils/response/custom-error/customer-error';

export const getCommissionRateBasedOnLocation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getRateBasedOnLocation(req.body)
    res.status(200).json(response)
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
