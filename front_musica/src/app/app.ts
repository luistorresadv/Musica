import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArtistaComponent } from './components/artista/artista';
import { AlbumComponent } from './components/album/album';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ArtistaComponent, AlbumComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front_musica');
}
