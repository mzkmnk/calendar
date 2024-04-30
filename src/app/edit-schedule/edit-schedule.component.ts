import {
  Component,
  OnInit,
  inject,
  Input,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonDatetime,
  IonDatetimeButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { returnDownBackOutline, checkmarkOutline } from 'ionicons/icons';
import { CalendarEvent } from '../mzkmnk-calendar/mzkmnk-calendar.component';
import { DetailScheduleComponent } from '../detail-schedule/detail-schedule.component';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss'],
  providers: [ModalController],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonList,
    IonLabel,
    IonButton,
    IonIcon,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditScheduleComponent implements OnInit {
  @Input() event: CalendarEvent;
  @Input() submit: (event: CalendarEvent) => void;
  editEvent: CalendarEvent;
  private modalCtrl = inject(ModalController);
  constructor() {
    addIcons({
      returnDownBackOutline,
      checkmarkOutline,
    });
  }

  ngOnInit() {
    this.editEvent = { ...this.event };
  }

  async back() {
    await this.modalCtrl.dismiss(null, 'cancel');
    const modal = await this.modalCtrl.create({
      component: DetailScheduleComponent,
      componentProps: { event: this.event },
      initialBreakpoint: 0.9,
    });
    await modal.present();
  }

  async submitSchedule(): Promise<void> {
    console.log('ok');
    await this.submit(this.editEvent);
    await this.modalCtrl.dismiss(null, 'submit');
  }
}
