import { Component, OnInit, inject } from '@angular/core';
import { RefresherCustomEvent, IonHeader, IonToolbar, IonTitle, IonContent, IonRefresher, IonRefresherContent, IonList } from '@ionic/angular/standalone';
import { MessageComponent } from '../message/message.component';
import { DataService, Message } from '../services/data.service';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
               IonHeader,
               IonToolbar,
               IonTitle,
               IonContent,
               IonRefresher,
               IonRefresherContent,
               IonList,
               IonCard,
               IonCardHeader,
               IonCardTitle,
               IonCardContent,
               MessageComponent],
})
export class HomePage implements OnInit {
  networkType: string = 'unknown';
  private data = inject(DataService);

  ngOnInit() {
    // Wait for device to be ready before using Cordova plugin
    document.addEventListener('deviceready', () => {
      const connection = (navigator as any).connection || (navigator as any).network.connection;
      if (connection) {
        this.networkType = connection.type;

        // Listen for network changes
        connection.addEventListener('change', () => {
          this.networkType = connection.type;
          console.log('Network changed to', this.networkType);
        });
      }
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
