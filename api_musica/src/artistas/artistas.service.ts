import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { Repository } from 'typeorm';
import { Artista } from './entities/artista.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistasService {
constructor(
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}


  async create(createArtistaDto: CreateArtistaDto) {
    if (createArtistaDto.fecha_nacimiento === '') {
      createArtistaDto.fecha_nacimiento = undefined;
    }

  const nuevoArtista = this.artistaRepository.create(createArtistaDto);
  return this.artistaRepository.save(nuevoArtista);

  }

  findAll() {   
    return this.artistaRepository.find({ relations: { album: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} artista`;
  }


  async remove(id: number) {
    const artista = await this.artistaRepository.findOneBy({ id });
    if (!artista) {
      throw new NotFoundException(`Artista con ID ${id} no encontrado`);
    }
    await this.artistaRepository.remove(artista);
    return { message: `Artista con ID ${id} eliminado con éxito` };
  }



  async update(id: number, updateArtistaDto: CreateArtistaDto) {
  if (updateArtistaDto.fecha_nacimiento === '') {
    updateArtistaDto.fecha_nacimiento = undefined;
  }

  const artistaExistente = await this.artistaRepository.findOneBy({ id });
  
  if (!artistaExistente) {
    throw new NotFoundException(`Artista con ID ${id} no existe en la base de datos`);
  }

 
  const artistaActualizado = this.artistaRepository.merge(artistaExistente, updateArtistaDto);
  
  return await this.artistaRepository.save(artistaActualizado);
}
  }

 
