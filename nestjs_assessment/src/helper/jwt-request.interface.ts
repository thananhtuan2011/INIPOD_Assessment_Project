import { Request } from 'express';

export interface JwtRequest extends Request {
    user: {
        id: number;
        username: string;
    };
}
