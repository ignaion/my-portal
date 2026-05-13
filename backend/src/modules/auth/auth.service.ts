import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  createToken(payload: object) {
    const secret = process.env.JWT_SECRET || 'change-me';
    return jwt.sign(payload, secret, { expiresIn: '7d' });
  }

  verifyToken(token: string) {
    const secret = process.env.JWT_SECRET || 'change-me';
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }
}
