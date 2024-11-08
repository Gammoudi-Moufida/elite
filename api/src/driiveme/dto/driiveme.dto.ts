import { ApiProperty } from "@nestjs/swagger/dist/decorators";


export class DriivemeDto {

    @ApiProperty()
    readonly format?: string;

    @ApiProperty()
    readonly departure?: string;

    @ApiProperty()
    readonly destination?: string;

    @ApiProperty()
    readonly vehiclecategory?: string;

    @ApiProperty()
    readonly vehicule_size?: string;

    @ApiProperty()
    readonly offreId?: number;

    @ApiProperty()
    readonly postalCode?: number;
    

}

