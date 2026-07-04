import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistasModule } from './artistas/artistas.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artista } from './artistas/entities/artista.entity';
import { Album } from './album/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306,    
      username: 'root', 
      password: 'root',
      database: 'api_musica',
      entities: [Artista, Album],      
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ArtistasModule,
    AlbumModule,
  ],
})
export class AppModule {}



