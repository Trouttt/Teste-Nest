import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

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