import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user?.isAdmin) {
    res.status(403).send('Access denied. Admins only.');
    return;
  }

  next();
};

export default adminOnly;
