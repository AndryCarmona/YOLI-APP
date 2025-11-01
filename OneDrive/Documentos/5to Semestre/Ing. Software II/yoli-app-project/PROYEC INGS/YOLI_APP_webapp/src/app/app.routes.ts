import { Routes } from '@angular/router';
import { Ejercicios } from './components/ejercicios/ejercicios';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/inicio/inicio').then(m => m.Inicio)
  },
  {
    path: 'modulos',
    loadComponent: () => import('./components/modulos/modulos').then(m => m.Modulos)
  },
  {
    path: 'lecciones/:id',
    loadComponent: () => import('./components/lecciones/lecciones').then(m => m.Lecciones)
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth').then(m => m.Auth)
  },
  {
    path: 'yoli-chat',
    loadComponent: () => import('./components/yoli-chat/yoli-chat').then(m => m.YoliChat)
  },
  {
    path: 'ejercicios/:moduleId/:lessonId',
    loadComponent: () => import('./components/ejercicios/ejercicios').then(m => m.Ejercicios)
  },
  { path: '**', redirectTo: '' }
];
