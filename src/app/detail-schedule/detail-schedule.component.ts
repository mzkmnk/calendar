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
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';

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
  @Input() submit: (event: CalendarEvent) => void;
  private modalCtrl = inject(ModalController);
  constructor() {}

  ngOnInit() {}

  async closeModal() {
    return await this.modalCtrl.dismiss(null, 'cancel');
  }

  async openEditModal() {
    await this.closeModal();
    const modal = await this.modalCtrl.create({
      component: EditScheduleComponent,
      componentProps: { event: this.event, submit: this.submit },
      initialBreakpoint: 0.9,
    });
    await modal.present();
  }
}
