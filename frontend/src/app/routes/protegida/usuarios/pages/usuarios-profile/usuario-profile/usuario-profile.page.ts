import {Component, OnInit, inject, signal, resource} from '@angular/core';
import {UsuariosService} from "../../../../../../services/usuarios.service";
import {MainStoreService} from "../../../../../../services/main-store.service";

@Component({
  selector: 'app-usuario-profile',
  templateUrl: './usuario-profile.page.html',
  styleUrls: ['./usuario-profile.page.scss'],
})
export class UsuarioProfilePage{
  usuarioService = inject(UsuariosService);
  mainStoreService = inject(MainStoreService);
  user = this.mainStoreService.usuario();
  constructor() { }

}
