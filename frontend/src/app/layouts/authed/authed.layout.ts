import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonMenu, IonToolbar, IonHeader, IonTitle, IonContent, IonMenuToggle, IonButton, IonButtons, IonMenuButton, IonRouterOutlet} from "@ionic/angular/standalone";
import {AuthService} from "../../services/auth.service";
import {MainStoreService} from "../../services/main-store.service";

@Component({
  selector: 'app-authed',
  templateUrl: './authed.layout.html',
  styleUrls: ['./authed.layout.scss'],
  imports: [IonMenu, RouterLink, IonToolbar, IonHeader, IonTitle, IonContent, IonMenuToggle, IonButton, IonButtons, IonMenuButton, IonRouterOutlet],
})
export class AuthedLayout  implements OnInit {
  authService = inject(AuthService);
  mainStore = inject(MainStoreService);
  usuario_id = this.mainStore.usuario()?.id_usuario;
  constructor() { }

  ngOnInit() {
    console.log("Init AuthedLayout");
  }

  async doLogout() {
    this.authService.logout();
    window.location.reload();
  }


}
