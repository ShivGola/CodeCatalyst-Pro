import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header'; 
import { HeroComponent } from './components/hero/hero';
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
// Class ka naam 'AppComponent' hona chahiye
export class AppComponent { 
  title = 'code-catalyst-pro';
}