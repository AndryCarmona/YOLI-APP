import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { YoliChat } from './components/yoli-chat/yoli-chat'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, YoliChat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'YOLI-APP';
}
