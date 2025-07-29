import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {MainStoreService} from "../services/main-store.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const mainStore = inject(MainStoreService);
  const router = inject(Router);
  // router.navigate(["auth","login"]);
  const usuario = mainStore.usuario();
  const admin = usuario?.roles[0];

  if (!(admin==='admin')){
    window.alert('Solo un adminisrador puede ingresar');
    router.navigate(["auth","login"]);
    return false;
  }
  return true;
};
