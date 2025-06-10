import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  imagenes: string[] = [
    'assets/clinica1.jpg',
    'assets/clinica2.jpg',
    'assets/clinica3.jpg',
    'assets/clinica4.jpg'
  ];
}
