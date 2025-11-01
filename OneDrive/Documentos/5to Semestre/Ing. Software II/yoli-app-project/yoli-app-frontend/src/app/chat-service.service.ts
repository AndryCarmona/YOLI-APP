// src/app/chat/chat.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Usar Observable para tipado

// Definir la interfaz (Buena Práctica)
interface ChatResponse {
  response: string;
}

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la app
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000/api/chat/';

  constructor(private http: HttpClient) { }

  /**
   * Envía el mensaje al backend y devuelve la respuesta del bot.
   * @param message El texto enviado por el usuario.
   * @returns Un Observable con la respuesta del bot.
   */
  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.apiUrl, { message });
  }
}
