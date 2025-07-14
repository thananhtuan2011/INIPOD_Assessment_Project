import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { PokemonCsvRow } from './interface/pokemoncsv.inteface';
import { Pokemon } from './entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BannerDTO } from './dto/banner.dto';

@Injectable()
export class PokemonService {
  constructor(@InjectRepository(Pokemon)
  private readonly pokemonRepository: Repository<Pokemon>,
  ) { }
  async importPokemonCSV(): Promise<Pokemon[]> {
    const results: Pokemon[] = [];

    const filePath = path.resolve(process.cwd(), 'src', 'assets', 'pokemon_data.csv');
    console.log('CSV path:', filePath);

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(filePath)) {
        const msg = `CSV file not found: ${filePath}`;
        console.error(msg);
        return reject(new Error(msg));
      }

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push({
            id: data.id,
            name: data.name,
            type1: data.type1,
            type2: data.type2,
            total: data.total,
            hp: data.hp,
            attack: data.attack,
            defense: data.defense,
            spAttack: data.spAttack,
            spDefense: data.spDefense,
            speed: data.speed,
            generation: data.generation,
            legendary: data.legendary,
            image: data.image,
            ytbUrl: data.ytbUrl,
          });
        })
        .on('end', async () => {
          const BATCH_SIZE = 500;
          for (let i = 0; i < results.length; i += BATCH_SIZE) {
            const chunk = results.slice(i, i + BATCH_SIZE);
            await this.pokemonRepository.save(chunk);
          }
          console.log(`Imported ${results.length} Pokémon from CSV.`);
          resolve(results);
        })
        .on('error', (err) => {
          console.error(' CSV import failed:', err);
          reject(err);
        });
    });
  }
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll() {
    return `This action returns all pokemon`;
  }
  async RandomBanner(): Promise<BannerDTO[]> {
    const rawPokemons = await this.pokemonRepository
      .createQueryBuilder('pokemon')
      .orderBy('RANDOM()')
      .limit(4)
      .getMany();

    return rawPokemons.map((poke) => ({
      ytbUrl: poke.ytbUrl,
    }));
  }



  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
