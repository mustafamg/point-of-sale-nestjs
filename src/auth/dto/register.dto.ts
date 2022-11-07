import { Equals, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    username:string

    @IsNotEmpty()
    @IsString()
    password:string

    // @Equals(comparison: )
    // confirmPassword:string	
}