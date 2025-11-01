// chat.ts (VERSIÓN FINAL Y LIMPIA)

import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http'; // ¡Ya no lo necesitamos aquí!
import { ChatService } from '../chat-service.service'; // <-- Importar el nuevo servicio

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class ChatComponent {
  messages: any[] = [];
  userInput = '';
  // apiUrl ya no es necesaria aquí

  // Inyectar ChatService y ChangeDetectorRef
  constructor(
    private chatService: ChatService, // <-- Usamos el servicio
    private cdRef: ChangeDetectorRef
  ) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessageText = this.userInput;
    this.userInput = '';

    // 1. Mensaje de usuario (inmutable)
    const userMsg = { sender: 'user', text: userMessageText };
    this.messages = [...this.messages, userMsg];

    // 2. Llamada a la API a través del servicio
    this.chatService.sendMessage(userMessageText).subscribe(res => {
      const botMsg = { sender: 'bot', text: res.response };

      // 3. Respuesta del bot (inmutable)
      this.messages = [...this.messages, botMsg];

      // 4. Forzar la detección de cambios (MANTENEMOS ESTO HASTA QUE SE RESUELVA EL BUG DE RENDERIZADO)
      this.cdRef.detectChanges();
    });
  }
}
