import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {EntranceWrapperComponent} from "../entrance-wrapper/entrance-wrapper.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    EntranceWrapperComponent,
    ReactiveFormsModule,
    IonItem,
    IonInput,
    IonLabel,
    IonButton
  ]
})
export class LoginPage {

  loginForm: FormGroup;
  message: string | undefined;

  constructor(readonly fb: FormBuilder,
              private readonly navCtrl: NavController) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(10)]],
      password: [null, [Validators.required]]
    });
  }

  login(): void {
  }
}
