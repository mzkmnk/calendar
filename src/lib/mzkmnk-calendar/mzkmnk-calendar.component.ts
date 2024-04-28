import { Component, OnInit,Input } from '@angular/core';
import { DatePipe } from '@angular/common';
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
} from '@ionic/angular/standalone';
import {
  chevronBackOutline,
  chevronForwardOutline,
  ellipse,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from 'date-fns';
import { sampleEvents } from './sumpleData';

interface CalendarEvent {
  id: number;
  title: string;
  firstDate: Date;
  lastDate: Date;
  allDay: boolean;
  location: string;
  details: string;
}

interface Week {
  [key: number]: Day;
}

interface Day {
  day: number;
  event: number;
}

@Component({
  selector: 'mzkmnk-calendar',
  templateUrl: 'mzkmnk-calendar.component.html',
  styleUrls: ['mzkmnk-calendar.component.scss'],
  standalone: true,
  imports: [
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
  @Input() data: CalendarEvent[] = sampleEvents;

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

  constructor() {
    addIcons({
      chevronBackOutline,
      chevronForwardOutline,
      ellipse,
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
          data[j].firstDate.getDate() === i + 1 &&
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
      console.log(this.selectedEvent);
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
}
