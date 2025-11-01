import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  currentRoute: string = '';
  showAuthButtons: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Detecta los cambios de ruta para ocultar/mostrar botones
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        this.showAuthButtons = !this.currentRoute.includes('/auth');
      });
  }

  navigateToAuth(): void {
    this.router.navigate(['/auth']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToLecciones(): void {
    this.router.navigate(['/lecciones']);
  }
}
