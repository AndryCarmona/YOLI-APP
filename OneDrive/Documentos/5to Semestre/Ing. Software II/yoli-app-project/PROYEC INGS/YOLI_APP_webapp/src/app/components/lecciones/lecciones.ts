import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService, Lesson } from '../../services/progress.service'; // ← Agrega Lesson aquí

@Component({
  selector: 'app-lecciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lecciones.html',
  styleUrls: ['./lecciones.css']
})
export class Lecciones implements OnInit {
  moduleId!: string;
  lessons: Lesson[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private progressService: ProgressService
  ) {}

  ngOnInit(): void {
    this.moduleId = this.route.snapshot.paramMap.get('id')!;
    const module = this.progressService.getModule(this.moduleId);
    if (module) this.lessons = module.lessons;
  }

  goToExercise(lesson: Lesson): void {
   // Navega a la ruta de ejercicios usando moduleId y lesson.id
   this.router.navigate(['/ejercicios', this.moduleId, lesson.id]);
  }

  toggleProgress(lesson: Lesson) {
    const newProgress = lesson.progress < 100 ? 100 : 0;
    this.progressService.updateLesson(this.moduleId, lesson.id, newProgress);
  }

  volver() {
    this.router.navigate(['/modulos']);
  }

    openChat() {
    this.router.navigate(['/yoli-chat']);
  }
}
