import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
        private jwtService: JwtService) { }

    register = async (userData: RegisterDto): Promise<User> => {
        const user = await this.userRepository.findOne({
            where: {
                username: userData.username
            }
        })

        if (user) {
            throw new HttpException({ message: 'This email has been used.' }, HttpStatus.BAD_REQUEST)
        }


        const hashPassword = await hash(userData.password, 10)

        const res = this.userRepository.create({
            ...userData,
            password: hashPassword

        })
        await this.userRepository.save(res);
        return res
    }

    login = async (data: { username: string, password: string }): Promise<any> => {

        const user = await this.userRepository.findOne({
            where: {
                username: data.username
            }
        })

        if (!user) {
            return null;
        }

        const verify = await compare(data.password, user.password)

        if (!verify) {
            return null;
        }


        const payload = { id: user.id, username: user.username }
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.ACCESS_TOKEN_KEY,
            expiresIn: '1h'
        })

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.REFRESH_TOKEN_KEY,
            expiresIn: '7d'
        })

        return {
            accessToken,
            refreshToken
        }
    }
    async refreshToken(refreshToken: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.REFRESH_TOKEN_KEY,
            });
            const newAccessToken = await this.jwtService.signAsync(
                { id: payload.id, username: payload.username },
                {
                    secret: process.env.ACCESS_TOKEN_KEY,
                    expiresIn: '1h',
                },
            );

            return {
                accessToken: newAccessToken,
            };
        } catch (error) {
            throw new HttpException(
                { message: 'Invalid or expired refresh token' },
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

}
