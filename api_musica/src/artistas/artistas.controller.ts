import { Controller, Get, Post, Body, Patch, Param, Delete ,Put } from '@nestjs/common';
import { ArtistasService } from './artistas.service';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';

@Controller('artistas')
export class ArtistasController {
  constructor(private readonly artistasService: ArtistasService) {}

  @Post()
  create(@Body() createArtistaDto: CreateArtistaDto) {
    return this.artistasService.create(createArtistaDto);
  }

  @Get()
  findAll() {
    return this.artistasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistasService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistasService.remove(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateArtistaDto: CreateArtistaDto) {
  return await this.artistasService.update(+id, updateArtistaDto);
}
}
