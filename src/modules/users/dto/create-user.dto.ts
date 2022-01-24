import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    
    cpf: string;
    cep: string;
    publicSpace: string;
    state: string;
    city: string;
}