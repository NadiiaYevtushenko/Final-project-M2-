import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwtUtils';

// Уніфіковано тип для запиту з `user`
export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const protect = (
  req: Request, // було: AuthenticatedRequest
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Неавторизований доступ' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    // @ts-ignore – бо express.Request не знає про `user`
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Невалідний токен' });
  }
};
