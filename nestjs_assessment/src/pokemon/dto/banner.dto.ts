import { IsNotEmpty } from "class-validator";

export class BannerDTO {
    @IsNotEmpty()
    ytbUrl: string
}
