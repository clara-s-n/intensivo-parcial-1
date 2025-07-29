import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';
import {adminGuard} from "./guards/admin.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/normal/normal.layout').then((m) => m.NormalLayout),
    children: [
      {
        path: '',
        redirectTo : "home",
        pathMatch: "full",
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./routes/home/home.page').then((m) => m.HomePage),
      },
        {
        path: 'auth/login',
        loadComponent: () =>
          import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage),
      },
    ],
  },
  {
    path: 'protegida',
    canActivateChild : [authenticatedGuard],
    loadComponent: () => import('./layouts/authed/authed.layout').then((m) => m.AuthedLayout),
    children: [
      {
        path: '',
        pathMatch : "full",
        loadComponent: () =>
          import('./routes/protegida/protegida.page').then((m) => m.ProtegidaPage ),
      },
      {
        path: 'usuarios',
        children : [
          {
            path: '',
            canActivate: [adminGuard],
            loadComponent: () =>
              import('./routes/protegida/usuarios/pages/usuarios-listado/usuarios-listado.page').then((m) => m.UsuariosListadoPage),
            pathMatch : "full"
          },
          {
            path: 'crear',
            canActivate: [adminGuard],
            pathMatch: 'full',
            loadComponent: () =>
              import('./routes/protegida/usuarios/pages/usuarios-crear/usuarios-crear.page').then((m) => m.UsuariosCrearPage),
          },
          {
            path: 'modificar/:id_usuario',
            canActivate: [adminGuard],
            pathMatch:'full',
            loadComponent: () =>
              import('./routes/protegida/usuarios/pages/usuarios-modificar/usuarios-modificar.page').then((m) => m.UsuariosModificarPage),
          },
          {
            path: 'usuarios-localidades/:id_usuario',
            canActivate: [adminGuard],
            pathMatch:'full',
            loadComponent: () =>
              import('./routes/protegida/usuarios/pages/usuarios-localidades/usuarios-localidades.page').then((m) => m.UsuariosLocalidadesPage),
          },
          {
            path: 'localidades-list',
            canActivate: [adminGuard],
            pathMatch:'full',
            loadComponent: () =>
              import('./routes/protegida/localidades/pages/localidades-list/localidades-list.page').then((m) => m.LocalidadesListPage),
          },
          {
            path: 'profile/:id_usuario',
            pathMatch:'full',
            loadComponent: () =>
              import('./routes/protegida/usuarios/pages/usuarios-profile/usuario-profile/usuario-profile.page').then((m) => m.UsuarioProfilePage),
          },
        ]
      },
    ]
  },
];
