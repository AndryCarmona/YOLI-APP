import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, FormsModule], // ← Asegúrate de tener estos imports
  templateUrl: './modulos.html',
  styleUrls: ['./modulos.css']
})
export class Modulos implements OnInit {
  searchTerm: string = '';
  modules$!: Observable<any[]>;

  constructor(private router: Router, private progressService: ProgressService) {}

  ngOnInit(): void {
    this.modules$ = this.progressService.modules$;
  }

  startModule(moduleId: string) {
    this.router.navigate(['/lecciones', moduleId]);
  }

  openChat() {
    this.router.navigate(['/yoli-chat']);
  }
}
