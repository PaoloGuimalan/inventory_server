import { Request, Response, NextFunction } from 'express';

export const permissionChecker = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const permission = req.headers['permission'];
  const method = req.method;

  if (permission) {
    if (method === 'DELETE' && permission === 'Admin') {
      next();
      return;
    }

    if (
      method === 'POST' &&
      (permission === 'Admin' || permission === 'Auditor')
    ) {
      next();
      return;
    }

    if (method === 'PUT' && permission === 'Auditor') {
      next();
      return;
    }

    if (method === 'GET') {
      next();
      return;
    }

    res.status(401).send({
      status: false,
      message: 'You do not have permission to execute this action',
    });
    return;
  }

  res.status(401).send({ status: false, message: 'You are not authenticated' });
};
