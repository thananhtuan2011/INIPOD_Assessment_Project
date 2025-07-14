import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator"

export class RegisterDto {


    @IsNotEmpty()
    username: string

    @MinLength(6)
    password: string

}

export class LoginDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @MinLength(6)
    password: string
}