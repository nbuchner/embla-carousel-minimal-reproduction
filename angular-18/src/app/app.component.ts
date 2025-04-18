import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-18';
}
