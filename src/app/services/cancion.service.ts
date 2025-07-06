import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancionService {

  // Atributos
  baseUri: string = 'https://back-musica.onrender.com/api';  // Cambia esto con la URL de tu backend de canciones
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Método para agregar una canción
  agregarCancion(data: any): Observable<any> {
    let url = `${this.baseUri}/agregar`;  // Ruta para agregar canción
    return this.http.post(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener todas las canciones
  getCanciones(): Observable<any> {
    let url = `${this.baseUri}/canciones`;  // Ruta para obtener canciones
    return this.http.get(url)
      .pipe(catchError(this.errorManager));
  }

  // Método para obtener una canción por ID
  getCancion(id: any): Observable<any> {
    let url = `${this.baseUri}/cancion/${id}`;  // Ruta para obtener canción por ID
    return this.http.get(url, { headers: this.headers })
      .pipe(map((res: any) => res || {}),
        catchError(this.errorManager));
  }

  // Método para actualizar una canción
  actualizarCancion(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;  // Ruta para actualizar canción
    return this.http.put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Método para eliminar una canción
  eliminarCancion(id: any): Observable<any> {
    let url = `${this.baseUri}/eliminar/${id}`;  // Ruta para eliminar canción
    return this.http.delete(url, { headers: this.headers })
      .pipe(catchError(this.errorManager));
  }

  // Manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Obtenemos el error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Obtenemos el error del lado del servidor
      errorMessage = `Error: ${error.status} \n Mensaje: ${error.message}`;
    }
    console.log(error.message);
    return throwError(() => errorMessage);
  }
}
