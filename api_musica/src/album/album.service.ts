import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto'; 
import { UpdateAlbumDto } from './dto/update-album.dto';
@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}


  create(createAlbumDto: CreateAlbumDto) {
    const nuevoAlbum = this.albumRepository.create({
      titulo: createAlbumDto.titulo,
      genero: createAlbumDto.genero,
      año_lanzamiento: createAlbumDto.anio_lanzamiento,
      discografica: createAlbumDto.discografica,
      artista: { id: createAlbumDto.artistaId } 
    });

    return this.albumRepository.save(nuevoAlbum);
  }

  findAll() {
    return this.albumRepository.find({ relations: { artista: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

 async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Álbum con ID ${id} no encontrado`);
    }
    album.titulo = updateAlbumDto.titulo ?? album.titulo;
    album.genero = updateAlbumDto.genero ?? album.genero;
    album.año_lanzamiento = updateAlbumDto.anio_lanzamiento ?? album.año_lanzamiento;
    album.discografica = updateAlbumDto.discografica ?? album.discografica;

    if (updateAlbumDto.artistaId) {
      album.artista = { id: updateAlbumDto.artistaId } as any;
    }
    
    return await this.albumRepository.save(album);
  }


  async remove(id: number) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Álbum con ID ${id} no encontrado`);
    }
    await this.albumRepository.delete(id);
    return { message: `Álbum con ID ${id} eliminado con éxito`, id };
  }
}
