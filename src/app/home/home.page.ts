import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

import {
  CalendarEvent,
  MzkmnkCalendarComponent,
} from '../mzkmnk-calendar/mzkmnk-calendar.component';
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
    {
      id: 2,
      title: '勉強会',
      firstDate: new Date('2024-04-29T00:00:00'),
      lastDate: new Date('2024-04-29T23:59:00'),
      allDay: true,
      location: '学校',
      details: '勉強する予定',
    },
    {
      id: 3,
      title: '勉強会',
      firstDate: new Date('2024-04-25T00:00:00'),
      lastDate: new Date('2024-04-25T23:59:00'),
      allDay: true,
      location: '学校',
      details: '勉強する予定',
    },
  ];

  async submit(event: CalendarEvent): Promise<void> {
    console.log(event);
  }

  ngOnInit(): void {}
}
