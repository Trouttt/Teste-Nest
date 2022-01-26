import { IsNotEmpty } from "class-validator";


export class UpdateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    cep: string;
    publicSpace: string;
    state: string;
    city: string;
}