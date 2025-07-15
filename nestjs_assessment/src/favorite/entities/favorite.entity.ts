import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Column,
    JoinColumn,
    Unique,
} from 'typeorm';
@Unique(['userId', 'pokemonId'])
@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('uuid')
    userId: string;

    @Column()
    pokemonId: number;

    @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Pokemon, pokemon => pokemon.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pokemonId' })
    pokemon: Pokemon;

    @CreateDateColumn()
    createdAt: Date;
}
