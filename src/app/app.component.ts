import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'; // Si es necesario

@Component({
  selector: 'app-root',
  standalone: true, // Solo si estás utilizando un enfoque standalone
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'musica';
}
