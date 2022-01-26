import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    cep: string;

    publicSpace: string;

    state: string;
 
    city: string;
}