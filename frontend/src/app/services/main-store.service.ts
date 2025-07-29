import { effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../model/user';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  public usuario = signal<User | undefined >(undefined);
  public token = signal<string | undefined >(undefined);
  private efecto = effect(() => console.log("Usuario desde effect: ", this.usuario()));

  constructor() {
    const datos = localStorage.getItem("TOKENYUSUARIO");
    console.log("Datos del localstorage: ", {datos});
    if (datos){
      const {usuario,token} = JSON.parse(datos);
      this.usuario.set(usuario);
      this.token.set(token);
    }
  }

  public setTokenYUsuario(usuario:User, token:string) {
    localStorage.clear();
    localStorage.setItem("TOKENYUSUARIO",JSON.stringify({usuario,token}));
    this.usuario.set(usuario);
    this.token.set(token);
  }
}
