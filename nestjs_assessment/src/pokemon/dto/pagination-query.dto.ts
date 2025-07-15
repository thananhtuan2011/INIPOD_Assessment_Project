import { IsOptional, IsString, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 20;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  speed: number = 20;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
