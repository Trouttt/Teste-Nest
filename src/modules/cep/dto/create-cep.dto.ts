import { IsNotEmpty, IsString } from "class-validator";

export class CreateCepDto {
    @IsNotEmpty()
    @IsString()
    cep: string;
    
    publicSpace: string;
    state: string;
    city: string;
}