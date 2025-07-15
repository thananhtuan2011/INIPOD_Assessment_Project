import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from 'src/helper/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { JwtRequest } from 'src/helper/jwt-request.interface';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }
  @Get('import')
  async importCSV() {

    try {
      await this.pokemonService.importPokemonCSV();
      return true;
    } catch (error) {
      console.error('Error importing CSV:', error);
      throw error;
    }
  }
  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }
  // @UseGuards(JwtAuthGuard)
  @Get('randomBanner')
  RandomBanner(@Req() req: Request) {
    return this.pokemonService.RandomBanner();
  }
  @Get('GetPokemon')
  GetPokemon(@Req() req: Request) {
    return this.pokemonService.GetPokemon();
  }
  @UseGuards(JwtAuthGuard)
  @Get('GetPaginatedPokemon')
  GetPaginatedPokemon(@Query() paginationDto: PaginationQueryDto, @Req() req: JwtRequest) {
    return this.pokemonService.getPaginatedPokemon(paginationDto, req.user["id"].toString());
  }
  @UseGuards(JwtAuthGuard)
  @Get('GetMyFavorite')
  GetMyFavorite(@Query() paginationDto: PaginationQueryDto, @Req() req: JwtRequest) {
    return this.pokemonService.GetMyFavorite(paginationDto, req.user["id"].toString());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }

}
