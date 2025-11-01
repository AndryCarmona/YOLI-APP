import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth{
  activeTab: 'login' | 'register' = 'login';

  // Login form
  loginEmail: string = '';
  loginPassword: string = '';

  // Register form
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';

  constructor(private router: Router) {}

  switchTab(tab: 'login' | 'register'): void {
    this.activeTab = tab;
  }

  onLoginSubmit(): void {
    if (!this.loginEmail || !this.loginPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    console.log('Login:', { email: this.loginEmail, password: this.loginPassword });
    alert('Inicio de sesión exitoso (simulación)');
    this.router.navigate(['/lecciones']);
  }

  onRegisterSubmit(): void {
    if (!this.registerName || !this.registerEmail || !this.registerPassword || !this.registerConfirmPassword) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.registerPassword !== this.registerConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Register:', {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword
    });

    alert('Registro exitoso (simulación)');
    this.switchTab('login');
  }

  loginWithSocial(provider: string): void {
    alert(`Login con ${provider} próximamente disponible`);
  }
}
