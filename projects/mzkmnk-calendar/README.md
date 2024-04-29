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

その他ファイルで使ってるinterface
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
  <mzkmnk-calendar [data]="<data>"></mzkmnk-calendar>
</ion-content>
```

## 注意

date-fns をインストールした時
`Namespace 'Intl' has no exported member 'LocalesArgument'......`
というエラーが出る可能性があるので
tsconfig.json の`"lib":[<other lib>]`に`"ES2020.Intl"`を追記する。

## 見た目

~~今後掲載予定~~

[ここ](https://github.com/mzkmnk/calendar)にあります。