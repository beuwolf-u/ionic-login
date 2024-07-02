import {Component} from '@angular/core';
import {IonAvatar, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonItem, IonRow} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {personCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-entrance-wrapper',
  templateUrl: './entrance-wrapper.component.html',
  styleUrls: ['./entrance-wrapper.component.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonGrid,
    IonRow,
    IonCard,
    IonCardContent,
    IonItem,
    IonAvatar,
    IonIcon
  ]
})
export class EntranceWrapperComponent {

  constructor() {
    addIcons({'person-circle-outline': personCircleOutline})
  }

}
