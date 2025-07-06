import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../../services/cancion.service';

@Component({
  selector: 'app-agregar-cancion',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css']
})
export class AgregarCancionComponent {

  // Propiedades
  cancionForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  generos: any = [
    'Rock',
    'Pop',
    'Jazz',
    'Hip-Hop',
    'Clásica',
    'Reggaetón',
    'Regional',
    'Otro'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private cancionService: CancionService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {}

  // Método para definir el formulario
  mainForm() {
    this.cancionForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaLanzamiento: ['', [Validators.required]],
      favorita: ['', [Validators.required]],  // Explicación de por qué es la canción favorita
    });
  }

  // Método para actualizar el género seleccionado a la propiedad del formulario.
  actualizarGenero(event: Event): void {
    const seleccionarElemento = event.target as HTMLSelectElement;
    const generoSeleccionado = seleccionarElemento.value;
    this.cancionForm.get('genero')?.setValue(generoSeleccionado);
  }

  // Getter para acceder a los controles del formulario
  get myForm() {
    return this.cancionForm.controls;
  }

  onSubmit() {
    this.enviado = true;
    if (!this.cancionForm.valid) {
      return;
    } else {
      this.cancionService.agregarCancion(this.cancionForm.value).subscribe({
        next: (response) => {
          console.log('Canción agregada correctamente');
          // Asegurarse de que la respuesta contenga lo que necesitamos para proceder
          this.router.navigate(['/listar-canciones']);
        },
        error: (e) => {
          console.log('Error al agregar la canción', e);
        }
      });
    }
  }



}
