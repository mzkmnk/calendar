import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, IonContent, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
