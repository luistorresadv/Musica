import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from '../../album/entities/album.entity'; 


@Entity('artistas')
export class Artista {
@PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ type: 'date', nullable: true }) 
  fecha_nacimiento!: string | null;

  @Column()
  nacionalidad!: string;

  @OneToMany(() => Album, (album) => album.artista)
  album!: Album[];


}
