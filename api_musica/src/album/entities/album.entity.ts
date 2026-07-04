import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artista } from '../../artistas/entities/artista.entity';
@Entity('albumes')
export class Album {
    @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ nullable: true })
  genero!: string;

  @Column({ type: 'int', nullable: true })
  año_lanzamiento!: number;

  @Column({ nullable: true })
  discografica!: string;

  @ManyToOne(() => Artista, (artista) => artista.album, { onDelete: 'CASCADE' })
  artista!: Artista;
}
