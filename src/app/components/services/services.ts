import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  // Aap dynamic services data yahan define kar sakte hain
  serviceList = [
    {
      id: '01',
      title: 'Custom Web Solutions',
      desc: 'We build scalable enterprise applications using Angular and .NET Core. Our focus is 100% on performance and security.',
      icon: '🌐'
    },
    {
      id: '02',
      title: 'Mobile Application',
      desc: 'High-speed Android and iOS apps using Ionic & Capacitor. 5 years of experience in real-time GPS and API integration.',
      icon: '📱'
    },
    {
      id: '03',
      title: 'Cloud Infrastructure',
      desc: 'Seamless data management with Firebase and Google Cloud. Zero downtime, maximum reliability.',
      icon: '☁️'
    }
  ];
}