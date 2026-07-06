import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private API_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  
  getArtistas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/artistas`);
  }

  createArtista(artista: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/artistas`, artista);
  }


deleteArtista(id: number) {
  return this.http.delete(`http://localhost:3000/artistas/${id}`, { responseType: 'text' });
}

updateArtista(id: number, artista: any) {
  return this.http.put(`http://localhost:3000/artistas/${id}`, artista);
}
getAlbumes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/album`);
  }

  createAlbum(album: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/album`, album);
  }

  
  updateAlbum(id: number, album: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/album/${id}`, album);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/album/${id}`, { responseType: 'text' as 'json' });
  }
}