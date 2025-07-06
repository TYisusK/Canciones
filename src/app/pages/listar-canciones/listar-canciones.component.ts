import { Component, OnInit } from '@angular/core';
import { CancionService } from '../../services/cancion.service';  // Servicio para manejar canciones
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-canciones',
  imports: [RouterLink, CommonModule],
  templateUrl: './listar-canciones.component.html',
  styleUrls: ['./listar-canciones.component.css']
})
export class ListarCancionesComponent implements OnInit {

  // Propiedades
  listaCanciones: any = [];

  constructor(private cancionService: CancionService) {
    this.getCanciones();
  }

  ngOnInit(): void {}

  // Método que hace la petición al service para obtener las canciones
  getCanciones() {
    this.cancionService.getCanciones().subscribe((data) => {
      this.listaCanciones = data;
    });
  }

  // Método para eliminar una canción
  eliminarCancion(cancion: any, index: any) {
    if (window.confirm('¿Estás seguro que deseas eliminar esta canción?')) {
      this.cancionService.eliminarCancion(cancion._id)
        .subscribe((data) => {
          this.listaCanciones.splice(index, 1);  // Elimina la canción del listado
        });
    }
  }

  // Función que asigna el color de borde según el género de la canción
  getBorderColor(genero: string): string {
    switch (genero) {
      case 'Rock':
        return '#FF5733';  // Color neón rojo
      case 'Pop':
        return '#FF0099';  // Color neón rosa
      case 'Jazz':
        return '#00BFFF';  // Color neón azul
      case 'Hip-Hop':
        return '#FFD700';  // Color neón dorado
      case 'Clásica':
        return '#8A2BE2';  // Color neón morado
      case 'Reggaetón':
        return '#32CD32';  // Color neón verde
      case 'Regional':
        return '#FFA500';  // Color neón naranja
      case 'Otro':
        return '#808080';  // Color gris para otros géneros
      default:
        return '#808080';  // Color por defecto
    }
  }
}
