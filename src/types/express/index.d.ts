import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        [key: string]: any;
      }; // Make it optional if user might not always be present
    }
  }
}
