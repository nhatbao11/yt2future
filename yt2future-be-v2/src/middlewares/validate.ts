import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';

function replaceObjectValues(target: Record<string, unknown>, nextValue: Record<string, unknown>) {
  for (const key of Object.keys(target)) {
    delete target[key];
  }
  Object.assign(target, nextValue);
}

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.parse(req.query) as Record<string, unknown>;
    // Express 5 exposes req.query via getter only; mutate in place instead of reassigning.
    replaceObjectValues(req.query as Record<string, unknown>, parsed);
    next();
  };
};

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body) as Request['body'];
    next();
  };
};

export const validateParams = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.params = schema.parse(req.params) as Request['params'];
    next();
  };
};
