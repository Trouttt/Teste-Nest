import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    
    @IsNotEmpty()
    @ApiProperty()
    cpf: string;

    @IsNotEmpty()
    @ApiProperty()
    cep: string;

    @ApiProperty()
    publicSpace: string;

    @ApiProperty()
    state: string;
 
    @ApiProperty()
    city: string;
}