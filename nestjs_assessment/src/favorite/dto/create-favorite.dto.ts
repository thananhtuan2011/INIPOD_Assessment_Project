import { IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {

    @IsNotEmpty()
    pokemonId: number;
}
