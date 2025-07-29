import { CanActivateFn } from '@angular/router';

export const adminOrSelfGuard: CanActivateFn = (route, state) => {
  // Obtener el :user_id de la ruta en la que estamos
  return true;
};
