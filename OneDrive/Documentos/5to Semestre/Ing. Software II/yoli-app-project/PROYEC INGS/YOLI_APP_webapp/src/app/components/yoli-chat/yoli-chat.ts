import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yoli-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './yoli-chat.html',
  styleUrl: './yoli-chat.css',
})
export class YoliChat {
  messages: any[] = [];
  userInput = '';
  // apiUrl ya no es necesaria aquí

  // Inyectar ChatService y ChangeDetectorRef
  constructor(
    private router: Router,
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

  volver() {
    this.router.navigate(['/modulos']);
  }

}
