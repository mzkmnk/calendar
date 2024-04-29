import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonLabel,
} from '@ionic/angular/standalone';
import { defineCustomElement as defineModal } from '@ionic/core/components/ion-modal';
import { defineCustomElement as defineLoading } from '@ionic/core/components/ion-loading.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, IonContent, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    defineModal();
    defineLoading();
  }
}
