import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Opcion {
  id: number;
  texto: string;
}

export interface Pregunta {
  titulo: string;
  texto: string;
  opciones: Opcion[];
  respuestaCorrectaId: number;
  explicacion: string;
  // Propiedades de estado para la lógica del componente (reutilización)
  respuestaSeleccionada: number | null;
  revisado: boolean;
  esCorrecta: boolean | null;
}

export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
  progress: number;
  exercises?: Pregunta[];
  content: string;
}

export interface Module {
  id: string;
  icon: string;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
  progress: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private modules: Module[] = [
    {
      id: '1 Numeros',
      icon: '🏺',
      title: 'Numeros',
      description: 'Aprende numeros basicos en náhuatl.',
      duration: '2-3 horas',
      lessons: [
        {
          id: 1,
          title: 'Introduccion a los Numeros Naturales',
          completed: false,
          progress: 0,
          content: '',
        },
        { id: 2, title: 'Caza de numeros ', completed: false, progress: 0, content: '' },
        { id: 3, title: 'Ejercicios Complementarios', completed: false, progress: 0, content: '' },
      ],
      progress: 0,
    },
    {
      id: '2 Saludos',
      icon: '👋',
      title: 'Saludos',
      description: 'Domina saludos básicos en náhuatl.',
      duration: '2-3 horas',
      lessons: [
        {
          id: 1,
          title: 'Saludo formal',
          completed: false,
          progress: 0,
          content: `<h1>Saludos Formales en Náhuatl</h1>
          <p>El náhuatl es una lengua de gran respeto, y esto se refleja en sus saludos. Para dirigirte a alguien de manera formal, es importante reconocer la hora del día.</p>
          <h2>El Saludo Básico y Universal</h2>
          <ul>
            <li><strong>Pialli</strong> (Pi-a-li): Es la forma más común y general de decir "Hola" o "Te saludo". Es similar al "Hola" en español y puedes usarlo a cualquier hora del día.</li>
          </ul>
          <h2>Saludos Específicos por Momento</h2>
          <p>Para ser más específico y formal, combinamos la palabra <strong>Cualli</strong> (que significa "bueno" o "bien") con la palabra que representa el momento del día. Esto funciona como un deseo de "que tengas un buen..."</p>
          <ul>
            <li><strong>Cualli Tlaneci:</strong> Significa "Buen Amanecer". Se utiliza para decir <strong>Buenos días</strong> desde el amanecer hasta el mediodía.</li>
            <li><strong>Cualli Tiotaqui:</strong> Significa "Buena Tarde". Se usa para decir <strong>Buenas tardes</strong> desde el mediodía hasta el anochecer.</li>
            <li><strong>Cualli Yohualli:</strong> Significa "Buena Noche". Se usa para decir <strong>Buenas noches</strong>, tanto al llegar como al despedirse.</li>
          </ul>
          <h2>Preguntas Formales</h2>
          <p>Otras frases útiles incluyen:</p>
          <ul>
            <li><strong>¿Quen motōca?</strong>: ¿Cómo te llamas?</li>
            <li><strong>Nōca...</strong>: Mi nombre es... (la forma de responder)</li>
          </ul> `,
          exercises: [
            //1er pregunta
            {
              titulo: 'Saludo Universal',
              texto:
                '¿Cuál es la forma más sencilla y universal de decir "Hola" o "Te saludo" en Náhuatl, utilizable a cualquier hora?',
              opciones: [
                { id: 1, texto: 'Cualli Yohualli' },
                { id: 2, texto: 'Cualli Tlaneci' },
                { id: 3, texto: 'Pialli' },
                { id: 4, texto: 'Queniuhqui' },
              ],
              respuestaCorrectaId: 3,
              explicacion:
                '<strong>Pialli</strong> es el saludo más básico y funciona como un "Hola" general en Náhuatl.',
              respuestaSeleccionada: null,
              revisado: false,
              esCorrecta: null,
            },
            {
              titulo: 'Saludo Matutino',
              texto:
                'Para desear <strong>Buenos días</strong> de manera formal (antes del mediodía), ¿qué expresión Náhuatl usarías?',
              opciones: [
                { id: 1, texto: 'Cualli Tiotaqui' },
                { id: 2, texto: 'Cualli Tlaneci' },
                { id: 3, texto: 'Cualli Yohualli' },
                { id: 4, texto: 'Tlazōcamati' },
              ],
              respuestaCorrectaId: 2,
              explicacion:
                '<strong>Tlaneci</strong> se refiere al amanecer y se combina con <strong>Cualli</strong> (bueno) para desear un buen día.',
              respuestaSeleccionada: null,
              revisado: false,
              esCorrecta: null,
            },
            {
              titulo: 'Saludo Vespertino',
              texto:
                'Si encuentras a alguien después del mediodía y quieres darle las <strong>Buenas tardes</strong> de forma formal, ¿cuál es la frase adecuada?',
              opciones: [
                { id: 1, texto: 'Cualli Tiotaqui' },
                { id: 2, texto: 'Pialli' },
                { id: 3, texto: 'Cualli Yohualli' },
                { id: 4, texto: 'Tlaneci' },
              ],
              respuestaCorrectaId: 1,
              explicacion:
                '<strong>Tiotaqui</strong> significa tarde y se usa para el saludo vespertino formal, es decir, buenas tardes.',
              respuestaSeleccionada: null,
              revisado: false,
              esCorrecta: null,
            },
            {
              titulo: 'Componente de Saludo',
              texto:
                'En los saludos formales como "Cualli Tlaneci," ¿qué significa la palabra <strong>Cualli</strong>?',
              opciones: [
                { id: 1, texto: 'Gracias' },
                { id: 2, texto: 'Mañana' },
                { id: 3, texto: 'Bueno / Bien' },
                { id: 4, texto: 'Noche' },
              ],
              respuestaCorrectaId: 3,
              explicacion:
                '<strong>Cualli</strong> es la raíz de los saludos formales y significa bueno o bien, deseando un "buen día", "buena tarde", etc.',
              respuestaSeleccionada: null,
              revisado: false,
              esCorrecta: null,
            },
            {
              titulo: 'Pregunta Personal',
              texto:
                'Si quieres preguntarle formalmente a alguien "¿Cómo te llamas?" en Náhuatl, ¿qué frase utilizarías?',
              opciones: [
                { id: 1, texto: '¿Queniuhqui timoxtin?' },
                { id: 2, texto: '¿Quen motōca?' },
                { id: 3, texto: 'Cualli Tiotaqui' },
                { id: 4, texto: 'Nōca...' },
              ],
              respuestaCorrectaId: 2,
              explicacion:
                '<strong>¿Quen motōca?</strong> es la pregunta formal que se traduce como "¿Cómo te llamas?" en Náhuatl.',
              respuestaSeleccionada: null,
              revisado: false,
              esCorrecta: null,
            },
          ],
        },
        { id: 2, title: 'Saludo informal', completed: false, progress: 0, content: '' },
      ],
      progress: 0,
    },
    {
      id: '3 Presentaciones',
      icon: '👋',
      title: 'Presentaciones',
      description: 'Domina una presentacion en náhuatl.',
      duration: '2-3 horas',
      lessons: [
        { id: 1, title: 'Presentaciones Cortas', completed: false, progress: 0, content: '' },
        { id: 2, title: 'Presentacion mas avanzada', completed: false, progress: 0, content: '' },
      ],
      progress: 0,
    },
  ];

  private modulesSubject = new BehaviorSubject<Module[]>(this.modules);
  modules$ = this.modulesSubject.asObservable();

  updateLesson(moduleId: string, lessonId: number, progress: number) {
    const module = this.modules.find((m) => m.id === moduleId);
    if (!module) return;

    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    lesson.progress = progress;
    lesson.completed = progress >= 100;

    module.progress = Math.round(
      module.lessons.reduce((sum, l) => sum + l.progress, 0) / module.lessons.length
    );

    this.modulesSubject.next([...this.modules]);
  }

  getModule(moduleId: string): Module | undefined {
    return this.modules.find((m) => m.id === moduleId);
  }

  getExercises(moduleId: string, lessonId: number): Pregunta[] | undefined {
    const module = this.modules.find((m) => m.id === moduleId);
    if (!module) return undefined;

    const lesson = module.lessons.find((l) => l.id === lessonId);
    // Retorna los ejercicios si existen, o un array vacío si la lección existe pero no tiene ejercicios
    return lesson?.exercises;
  }

  markLessonCompleted(moduleId: string, lessonId: number): void {
    this.updateLesson(moduleId, lessonId, 100);
  }
}
