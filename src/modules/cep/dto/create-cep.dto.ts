import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCepDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    cep: string;
    
    @ApiProperty()
    publicSpace: string;
    
    @ApiProperty()
    state: string;

    @ApiProperty()
    city: string;
}