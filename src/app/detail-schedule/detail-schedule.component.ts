import { Component, OnInit, Input, inject } from '@angular/core';
import { CalendarEvent } from '../mzkmnk-calendar/mzkmnk-calendar.component';
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonModal,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-schedule',
  templateUrl: './detail-schedule.component.html',
  styleUrls: ['./detail-schedule.component.scss'],
  providers: [ModalController],
  standalone: true,
  imports: [IonModal, IonButton, IonIcon, IonLabel, DatePipe],
})
export class DetailScheduleComponent implements OnInit {
  @Input() event: CalendarEvent;
  private modalCtrl = inject(ModalController);
  constructor() {}

  ngOnInit() {}

  closeModal() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
