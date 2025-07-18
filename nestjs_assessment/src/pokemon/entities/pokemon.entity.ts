import { Favorite } from 'src/favorite/entities/favorite.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('pokemon')
export class Pokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type1: string;

    @Column({ nullable: true })
    type2: string;

    @Column()
    total: number;

    @Column()
    hp: number;

    @Column()
    attack: number;

    @Column()
    defense: number;

    @Column()
    spAttack: number;

    @Column()
    spDefense: number;

    @Column()
    speed: number;

    @Column()
    generation: number;

    @Column()
    legendary: boolean;

    @Column()
    image: string;

    @Column()
    ytbUrl: string;

    @OneToMany(() => Favorite, favorite => favorite.pokemon)
    favorites: Favorite[];
}