import { Component, OnInit, Input, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import {
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonModal,
} from '@ionic/angular/standalone';
import {
  chevronBackOutline,
  chevronForwardOutline,
  ellipse,
  closeOutline,
  createOutline,
  create,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from 'date-fns';

import { DetailScheduleComponent } from '../detail-schedule/detail-schedule.component';

export interface CalendarEvent {
  id: number;
  title: string;
  firstDate: Date;
  lastDate: Date;
  allDay: boolean;
  location?: string;
  details?: string;
}

export interface Week {
  [key: number]: Day;
}

export interface Day {
  day: number;
  event: number;
}

@Component({
  selector: 'mzkmnk-calendar',
  templateUrl: 'mzkmnk-calendar.component.html',
  styleUrls: ['mzkmnk-calendar.component.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [
    IonModal,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonCard,
    IonItem,
    IonList,
    IonCol,
    IonRow,
    IonGrid,
    IonIcon,
    IonButton,
    IonLabel,
    IonContent,
    DatePipe,
  ],
})
export class MzkmnkCalendarComponent implements OnInit {
  @Input() data: CalendarEvent[] = [
    {
      id: 1,
      title: '遊びに行く',
      firstDate: new Date('2024-04-01T10:15:00'),
      lastDate: new Date('2024-04-01T11:00:00'),
      allDay: false,
      location: '東京都',
      details: '浅草とかにいく予定',
    },
    {
      id: 2,
      title: '映画鑑賞',
      firstDate: new Date('2024-04-05T19:00:00'),
      lastDate: new Date('2024-04-05T21:30:00'),
      allDay: false,
      location: '新宿',
      details: '新作映画を友人と観に行く',
    },
    {
      id: 3,
      title: 'ランニング',
      firstDate: new Date('2024-04-28T06:00:00'),
      lastDate: new Date('2024-04-30T07:30:00'),
      allDay: false,
      location: '代々木公園',
      details: '朝練を行う',
    },
    {
      id: 4,
      title: '昼食会',
      firstDate: new Date('2024-04-10T12:00:00'),
      lastDate: new Date('2024-04-10T13:30:00'),
      allDay: false,
      location: '六本木',
      details: '同僚と昼食をとる',
    },
  ];

  /**
   * 曜日の配列
   */
  dayOfWeek: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  /**
   * 今日の日付
   */
  nowDate: Date = new Date();
  /**
   * 月の日付の配列
   */
  dayOfMonth: Week[] = [];
  /**
   * 表示している月の名前
   */
  monthName: string = '';
  /**
   * 西暦
   */
  year: string = '';
  /**
   * ユーザが選択している日付
   * 初期値は今日の日付
   */
  selectedDate: number = this.nowDate.getDate();
  /**
   * イベントの配列
   */
  selectedEvent: CalendarEvent[] = [];

  private modalCtrl = inject(ModalController);
  constructor() {
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
      ellipse,
      closeOutline,
      createOutline,
    });
  }

  ngOnInit(): void {
    this.loadCalendar(this.nowDate, this.data);
    this.normalizeEvent(this.data);
  }

  /**
   * 前の月に移動
   */
  back() {
    this.nowDate.setMonth(this.nowDate.getMonth() - 1);
    this.loadCalendar(this.nowDate, this.data);
    //初期化
    this.selectedDate = 0;
    this.selectedEvent = [];
  }
  /**
   * 次の月に移動
   */
  next() {
    this.nowDate.setMonth(this.nowDate.getMonth() + 1);
    this.loadCalendar(this.nowDate, this.data);
    //初期化
    this.selectedDate = 0;
    this.selectedEvent = [];
  }

  /**
   * @function loadCalendar
   * @param date 表示させたい月の日付
   * @returns void
   */
  loadCalendar(date: Date = new Date(), data: CalendarEvent[]): void {
    this.monthName = this.getMonthName(date);
    this.year = format(date, 'yyyy');
    //変数の初期化を行う。
    this.dayOfMonth = [];
    const dayOfInterval = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });
    var week: Week = {};
    for (let i = 0; i < dayOfInterval.length; ++i) {
      const dayOfIndex: number = getDay(dayOfInterval[i]);
      if (dayOfIndex % 7 == 0 && Object.keys(week).length > 0) {
        this.dayOfMonth.push(week);
        week = {};
      }
      week[dayOfIndex] = {
        day: i + 1,
        event: 0,
      };
      for (let j = 0; j < data.length; ++j) {
        if (
          data[j].firstDate.getDate() <= i + 1 &&
          data[j].lastDate.getDate() >= i + 1 &&
          data[j].firstDate.getMonth() === date.getMonth()
        ) {
          week[dayOfIndex].event++;
        }
      }
    }
    //Object.keysでオブジェクトのキーを取得
    if (Object.keys(week).length > 0) {
      this.dayOfMonth.push(week);
    }
  }

  /**
   * @function normalizeEvent
   * @param event イベントの配列
   * @returns void
   * @description
   * 選択された日付に含まれるイベントを取得する。
   */
  normalizeEvent(event: CalendarEvent[]): void {
    this.selectedEvent = [];
    for (let i = 0; i < event.length; ++i) {
      if (
        event[i].firstDate.getDate() <= this.selectedDate &&
        event[i].lastDate.getDate() >= this.selectedDate &&
        event[i].firstDate.getMonth() === this.nowDate.getMonth()
      ) {
        this.selectedEvent.push(event[i]);
      }
    }
  }

  /**
   *
   * @function getMonthName
   * @param date 取得したい月の日付
   * @param locate 取得したい月の言語
   * @returns 月の名前
   */
  getMonthName(date: Date, locate: string = 'en-US'): string {
    return new Intl.DateTimeFormat(locate, { month: 'long' }).format(date);
  }

  /**
   * @function selected
   * @param day 日付
   * @returns void
   */
  selected(day: number): void {
    if (this.selectedDate === day) {
      this.selectedDate = 0;
      this.selectedEvent = [];
    } else {
      this.selectedDate = day;
      this.normalizeEvent(this.data);
    }
  }

  /**
   * @function isSelected
   * @param day 日付
   * @returns true or false
   */
  isSelected(day: number): boolean {
    return this.selectedDate === day;
  }

  //モダール
  async openModal(event: CalendarEvent) {
    const modal = await this.modalCtrl.create({
      mode: 'ios',
      component: DetailScheduleComponent,
      componentProps: {
        event: event,
      },
      initialBreakpoint: 0.9,
    });
    modal.present();
  }
}
