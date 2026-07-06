import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album.html',
  styleUrls: ['./album.css']
})
export class AlbumComponent implements OnInit {
  albumes: any[] = [];
  artistas: any[] = []; 

  editando: boolean = false;
  idSeleccionado: number | null = null;

  nuevoAlbum = {
    titulo: '',
    genero: '',
    anio: '',
    discografica: '',
    artistaId: ''
  };

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.cargarAlbumes();
    this.cargarArtistas();
  }

  cargarAlbumes() {
    this.musicaService.getAlbumes().subscribe({
      next: (data: any) => { this.albumes = data; },
      error: (err: any) => console.error('Error al obtener álbumes:', err)
    });
  }

  cargarArtistas() {
    this.musicaService.getArtistas().subscribe({
      next: (data: any) => { this.artistas = data; },
      error: (err: any) => console.error('Error al obtener artistas:', err)
    });
  }

  guardarAlbum() {
    const idArtista = this.nuevoAlbum.artistaId ? parseInt(this.nuevoAlbum.artistaId, 10) : null;
    const anioLanzamiento = this.nuevoAlbum.anio ? parseInt(this.nuevoAlbum.anio, 10) : null;

    const datosAEnviar = {
      titulo: this.nuevoAlbum.titulo,
      genero: this.nuevoAlbum.genero,
      anio_lanzamiento: anioLanzamiento,
      discografica: this.nuevoAlbum.discografica,
      artistaId: idArtista 
    };

    if (this.editando && this.idSeleccionado !== null) {
      this.musicaService.updateAlbum(this.idSeleccionado, datosAEnviar).subscribe({
        next: () => this.finalizarAccion(),
        error: (err: any) => err.status === 200 ? this.finalizarAccion() : console.error(err)
      });
    } else {
      this.musicaService.createAlbum(datosAEnviar).subscribe({
        next: () => this.finalizarAccion(),
        error: (err: any) => (err.status === 200 || err.status === 201) ? this.finalizarAccion() : console.error(err)
      });
    }
  }

  seleccionarParaEditar(alb: any) {
    this.editando = true;
    this.idSeleccionado = alb.id;
    this.nuevoAlbum = {
      titulo: alb.titulo,
      genero: alb.genero,
      anio: alb['año_lanzamiento'] ? alb['año_lanzamiento'].toString() : '',
      discografica: alb.discografica,
      artistaId: alb.artista ? alb.artista.id.toString() : ''
    };
  }

  eliminarAlbum(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
      this.albumes = this.albumes.filter(alb => alb.id !== id); 
      this.musicaService.deleteAlbum(id).subscribe({
        next: () => this.cargarAlbumes(),
        error: (err: any) => err.status === 200 ? this.cargarAlbumes() : console.error(err)
      });
    }
  }

  limpiarFormulario() {
    this.editando = false;
    this.idSeleccionado = null;
    this.nuevoAlbum = { titulo: '', genero: '', anio: '', discografica: '', artistaId: '' };
  }

  finalizarAccion() {
    this.cargarAlbumes();
    this.limpiarFormulario();
  }
}