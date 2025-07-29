import { Component, inject, OnDestroy, OnInit, resource } from '@angular/core';
import { User } from 'src/app/model/user';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { environment } from 'src/environments/environment';
import {IonButton, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.page.html',
  styleUrls: ['./usuarios-listado.page.scss'],
  imports: [ IonList, IonItem, IonLabel, IonButton, RouterLink],
})
export class UsuariosListadoPage  implements OnInit, OnDestroy {

  private usuarioService = inject(UsuariosService);
  private socket?:WebSocket;

  public usuariosSignal = resource({
    loader : () => this.usuarioService.getAll()
  });

  constructor() { }


  async ngOnInit() {
    this.socket = new WebSocket(environment.apiUrl);
    this.socket.onopen = () => {
      console.log("Socket conectados.");
    }
    this.socket.onmessage = (event:MessageEvent) => {
      const cadena = event.data.toString();
      try {
        const nuevoUsuarioCreado:User = JSON.parse(cadena).data;
        console.log({nuevoUsuarioCreado});
        const actuales = this.usuariosSignal.value();
        if (!actuales) return;
        this.usuariosSignal.set([...actuales,nuevoUsuarioCreado])
      }catch(error:any){
        console.error("No se puede parsear la cadena: ", cadena);
      }
    }
  }

  ngOnDestroy(): void {
    this.socket?.close();
  }

}
