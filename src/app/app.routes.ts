import { Routes } from '@angular/router';

import { ListarCancionesComponent } from './pages/listar-canciones/listar-canciones.component';
import { AgregarCancionComponent } from './pages/agregar-cancion/agregar-cancion.component';
import { EditarCancionComponent } from './pages/editar-cancion/editar-cancion.component';


export const routes: Routes = [

     {
        path: '',
        pathMatch: 'full',
        redirectTo: 'listar-canciones'
    },
    {
        path: 'listar-canciones',
        component: ListarCancionesComponent
    },
    {
        path: 'agregar-cancion',
        component: AgregarCancionComponent
    },
    {
        path: 'editar-cancion/:id',
        component: EditarCancionComponent
    },
    {
        path: '**',
        redirectTo: 'listar-canciones'
    }
];
