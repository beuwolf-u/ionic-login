import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem, IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardContent,
    IonItem,
    IonButton,
    IonLabel
  ]
})
export class NotFoundPage {

  constructor(private readonly navCtrl: NavController) {
  }

  backHome() {
    this.navCtrl.navigateRoot(['/home'], {skipLocationChange: true});
  }
}
