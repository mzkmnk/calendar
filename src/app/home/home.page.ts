import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import { MzkmnkCalendarComponent } from '../mzkmnk-calendar/mzkmnk-calendar.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, MzkmnkCalendarComponent],
})
export class HomePage implements OnInit {
  constructor() {}
  data = [
    {
      id: 1,
      title: '遊びに行く',
      firstDate: new Date('2024-04-29T10:15:00'),
      lastDate: new Date('2024-04-29T11:00:00'),
      allDay: false,
      location: '東京都',
      details: '浅草とかにいく予定',
    },
  ];
  ngOnInit(): void {}
}
