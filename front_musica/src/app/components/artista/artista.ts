import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicaService } from '../../services/musica';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artista.html',
  styleUrls: ['./artista.css']
})
export class ArtistaComponent implements OnInit {
  artistas: any[] = []; 
  
  editando: boolean = false;
  idSeleccionado: number | null = null;
  
  nuevoArtista = {
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    nacionalidad: ''
  };

  constructor(private musicaService: MusicaService) {}

  ngOnInit(): void {
    this.cargarArtistas();
  }

  cargarArtistas() {
    this.musicaService.getArtistas().subscribe({
      next: (data) => this.artistas = data,
      error: (err) => console.error('Error al obtener artistas:', err)
    });
  }

 
    guardarArtista() {
    if (this.nuevoArtista.fecha_nacimiento === '') {
      (this.nuevoArtista as any).fecha_nacimiento = undefined;
    }

    
    const datosAEnviar = {
      nombre: this.nuevoArtista.nombre,
      apellido: this.nuevoArtista.apellido,
      fecha_nacimiento: this.nuevoArtista.fecha_nacimiento,
      nacionalidad: this.nuevoArtista.nacionalidad
    };

    if (this.editando && this.idSeleccionado !== null) {
      this.musicaService.updateArtista(this.idSeleccionado, datosAEnviar).subscribe({
        next: () => {
          this.cargarArtistas(); 
          this.limpiarFormulario();
        },
        error: (err) => {
          
          if (err.status === 200) {
            this.cargarArtistas();
            this.limpiarFormulario();
          } else {
            console.error('Error al editar artista:', err);
          }
        }
      });
    } else {
      this.musicaService.createArtista(datosAEnviar).subscribe({
        next: () => {
          this.cargarArtistas(); 
          this.limpiarFormulario();
        },
        error: (err) => {
          if (err.status === 201 || err.status === 200) {
            this.cargarArtistas();
            this.limpiarFormulario();
          } else {
            console.error('Error al guardar artista:', err);
          }
        }
      });
    }
  }
  

  seleccionarParaEditar(art: any) {
    console.log("Datos del artista seleccionado:", art); 
    this.editando = true;
    this.idSeleccionado = art.id;
  
    this.nuevoArtista = {
    nombre: art.nombre,
    apellido: art.apellido,
    fecha_nacimiento: art.fecha_nacimiento ? art.fecha_nacimiento.split('T')[0] : '',
    nacionalidad: art.nacionalidad
  };
  }

  
  eliminarArtista(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este artista?')) {
      this.musicaService.deleteArtista(id).subscribe({
        next: () => {
          this.cargarArtistas(); 
        },
        error: (err) => {
          
          if (err.status === 200) {
            this.cargarArtistas();
          } else {
            console.error('Error al eliminar artista:', err);
          }
        }
      });
    }
  }

  
  limpiarFormulario() {
    this.editando = false;
    this.idSeleccionado = null;
    this.nuevoArtista = { nombre: '', apellido: '', fecha_nacimiento: '', nacionalidad: '' };
  }
}