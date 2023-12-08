import { Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestCountMiddleware {
  private requestCount = 0;

  use(req: Request, res: Response, next: NextFunction) {
    this.requestCount++;

    if (this.requestCount > 3) {
      return res
        .status(429)
        .json({ message: `Too Many Requests ${this.requestCount}` });
    }

    next();
  }
}
