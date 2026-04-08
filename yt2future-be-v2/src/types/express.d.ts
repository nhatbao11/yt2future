export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        fullName?: string | null;
        avatarUrl?: string | null;
        role?: string;
      };
      t: (key: string, options?: Record<string, unknown>) => string;
    }
  }
}
export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        fullName?: string | null;
        avatarUrl?: string | null;
        role?: string;
      };
      t: (key: string, options?: Record<string, unknown>) => string;
    }
  }
}
import type { Role } from '@prisma/client';
import type { TFunction } from 'i18next';

declare global {
  namespace Express {
    interface Request {
      /** Set by i18next-http-middleware (after `handle(i18next)`) */
      t: TFunction;
      user?: {
        id: string;
        fullName?: string;
        avatarUrl?: string;
        role?: Role;
        email?: string;
        userId?: string;
      };
    }
  }
}

export {};
