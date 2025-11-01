import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  features: Feature[] = [
    {
      icon: '📚',
      title: 'Lecciones Interactivas',
      description: 'Aprende náhuatl con actividades dinámicas y ejercicios prácticos.'
    },
    {
      icon: '🤖',
      title: 'Yoli-Chat',
      description: 'Pregunta lo que quieras.'
    },
    {
      icon: '🐺',
      title: 'Cultura Viva',
      description: 'Descubre las tradiciones, mitos y costumbres nahuas.'
    },
    {
      icon: '📱',
      title: 'Aprendizaje Móvil',
      description: 'Accede a tus lecciones desde cualquier dispositivo.'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  navigateToLecciones(): void {
    this.router.navigate(['/lecciones']);
  }
}
