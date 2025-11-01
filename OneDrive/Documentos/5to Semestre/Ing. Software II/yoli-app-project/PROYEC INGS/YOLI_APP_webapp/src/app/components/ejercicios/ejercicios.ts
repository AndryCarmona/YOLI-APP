import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService, Pregunta } from './../../services/progress.service';

@Component({
  selector: 'app-ejercicios',
  imports: [CommonModule],
  templateUrl: './ejercicios.html',
  styleUrl: './ejercicios.css',
})
export class Ejercicios implements OnInit {
  moduleId!: string;
  lessonId!: number;
  excerciseTitle!: string;
  preguntas: Pregunta[] = [];
  informacion: string = '';
  lessonContent: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private progressService : ProgressService
  ) {}

  ngOnInit(): void {
    // 1. Obtener ambos parámetros de la URL
    this.moduleId = this.route.snapshot.paramMap.get('moduleId')!;
    // Asume que lessonId es un número
    const lessonIdStr = this.route.snapshot.paramMap.get('lessonId');
    this.lessonId = lessonIdStr ? +lessonIdStr : 0;

    // 2. Cargar ejercicios específicos
    this.cargarEjercicios();
  }

    cargarEjercicios(): void {
      const module = this.progressService.getModule(this.moduleId);
      const lesson = module?.lessons.find(l => l.id === this.lessonId);

      const ejerciciosCargados = this.progressService.getExercises(this.moduleId, this.lessonId);

      // 3. Lógica principal para asignar el contenido
      if (lesson) {
            // Asignar el título de la lección
      this.excerciseTitle = `Ejercicios: ${lesson.title}`;

            // 💡 CORRECCIÓN DE PROPIEDAD: Debería ser 'content' (o el nombre que uses en la interfaz Lesson)
      this.informacion = lesson.content || '';

            // 4. Inicializar las preguntas si existen
      if (ejerciciosCargados && ejerciciosCargados.length > 0) {
        this.preguntas = ejerciciosCargados.map(p => ({
          ...p,
          respuestaSeleccionada: null,
          revisado: false,
          esCorrecta: null,
        }));
      } else {
        this.preguntas = [];
      }

    } else {
      console.warn('No se encontró el contenido de la lección.');
      this.excerciseTitle = 'Sin Ejercicios';
      this.informacion = 'Error: Lección no encontrada.';
      this.preguntas = [];
    }
  }

  // 3. Método para manejar la selección del radio button
  seleccionarRespuesta(indicePregunta: number, idOpcion: number): void {
    if (!this.preguntas[indicePregunta].revisado) {
      this.preguntas[indicePregunta].respuestaSeleccionada = idOpcion;
    }
  }

  // 4. Método para comprobar la respuesta
  revisarRespuesta(indicePregunta: number): void {
    const pregunta = this.preguntas[indicePregunta];

    if (pregunta.respuestaSeleccionada !== null) {
      pregunta.revisado = true;
      pregunta.esCorrecta = pregunta.respuestaSeleccionada === pregunta.respuestaCorrectaId;
    }
  }

  markCompletedAndGoBack(): void {
    // 1. Marca la lección como completada (100% de progreso)
  this.progressService.markLessonCompleted(this.moduleId, this.lessonId);

    // 2. Regresa a la pantalla de lecciones
  this.volver();
  }

  volver() {
    this.router.navigate(['/lecciones', this.moduleId]);
  }

    openChat() {
    this.router.navigate(['/yoli-chat']);
  }
}
