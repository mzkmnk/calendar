# custom-calendar-ui

## 概要

custom-calendar-UI です。

data として渡す型は下記の通りです。

```ts
interface CalendarEvent {
  id: number;
  title: string;
  firstDate: Date;
  lastDate: Date;
  allDay: boolean;
  location: string;
  details: string;
}
```

その他ファイルで使ってる interface

```ts
interface Week {
  [key: number]: Day;
}

interface Day {
  day: number;
  event: number;
}
```

## 使い方

ts ファイル

```ts
import { MzkmnkCalendarComponent } from "mzkmnk-calendar";
```

html ファイル

```html
<ion-content>
  <mzkmnk-calendar [data]="<data>" [submit]="<submit-function>"></mzkmnk-calendar>
</ion-content>
```

ここでの submit で

```ts
interface CalendarEvent {
  id: number;
  title: string;
  firstDate: Date;
  lastDate: Date;
  allDay: boolean;
  location: string;
  details: string;
}

...
async submit(event: CalendarEvent): Promise<void> {
    console.log(event);
    // firebaseに保存する処理を追記する
  }
```
という関数ようなを渡してあげることで非同期処理(firestoreにデータの保存)を行うことも可能です。

## 現状できていない部分
2024/05/01
* Dateを変更する部分
* スケジュール新規登録画面
時間ある時追加していきます。。。

## 注意

date-fns をインストールした時
`Namespace 'Intl' has no exported member 'LocalesArgument'......`
というエラーが出る可能性があるので
tsconfig.json の`"lib":[<other lib>]`に`"ES2020.Intl"`を追記する。

## 見た目
~~今後掲載予定~~
[ここ](https://github.com/mzkmnk/calendar)にあります。
