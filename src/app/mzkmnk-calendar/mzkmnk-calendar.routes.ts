// mzkmnk-calendar.routes.ts
import { Routes } from '@angular/router';
import { MzkmnkCalendarComponent } from './mzkmnk-calendar.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

export const MZKMNK_CALENDAR_ROUTES: Routes = [
  {
    path: '',
    component: MzkmnkCalendarComponent,
    children: [
      {
        path: 'edit-schedule',
        component: EditScheduleComponent,
      },
    ],
  },
];
