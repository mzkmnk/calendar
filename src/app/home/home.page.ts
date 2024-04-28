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
  ngOnInit(): void {}
}
