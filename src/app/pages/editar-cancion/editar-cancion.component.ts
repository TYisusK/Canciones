import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CancionService } from '../../services/cancion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-cancion',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './editar-cancion.component.html',
  styleUrls: ['./editar-cancion.component.css']
})
export class EditarCancionComponent implements OnInit {

  // Propiedades
  editarCancionForm: FormGroup = new FormGroup({});
  enviado: boolean = false;
  cancionData: any = {};

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private cancionService: CancionService,
    private actRoute: ActivatedRoute
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getCancion(id);
  }

  // Método para definir el formulario
  mainForm() {
    this.editarCancionForm = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaLanzamiento: ['', [Validators.required]],
      favorita: ['', [Validators.required]]
    });
  }

  // Método para obtener la canción que vamos a modificar
  getCancion(id: any) {
    this.cancionService.getCancion(id).subscribe((data) => {
      this.editarCancionForm.setValue({
        titulo: data['titulo'],
        autor: data['autor'],
        genero: data['genero'],
        fechaLanzamiento: data['fechaLanzamiento'],
        favorita: data['favorita']
      });
    });
  }

  // Getter para acceder a los controles del formulario
  get myForm() {
    return this.editarCancionForm.controls;
  }

  // Método que se ejecuta cuando se hace el submit
  onSubmit() {
    this.enviado = true;
    if (!this.editarCancionForm.valid) {
      return false;
    } else {
      if (window.confirm('¿Estás seguro que deseas modificar los datos de esta canción?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.cancionService.actualizarCancion(id, this.editarCancionForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listar-canciones');
              console.log('Se actualizó correctamente');
            },
            error: (e) => {
              console.log(e);
            }
          });
      }
    }
    return;
  }
}
