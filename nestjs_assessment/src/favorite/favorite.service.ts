import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {

  constructor(@InjectRepository(Favorite)
  private readonly favoriteRepository: Repository<Favorite>,
  ) { }

  async create(createFavoriteDto: CreateFavoriteDto, userId: string) {
    const data = await this.favoriteRepository.findOne({
      where: {
        userId: userId,
        pokemonId: createFavoriteDto.pokemonId
      }
    })
    if (data) {
      await this.favoriteRepository.remove(data);
    }
    else {

      const res = this.favoriteRepository.create({
        userId: userId,
        ...createFavoriteDto
      });
      await this.favoriteRepository.save(res);
    }

    return createFavoriteDto
  }

  findAll() {
    return `This action returns all favorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} favorite`;
  }
}
