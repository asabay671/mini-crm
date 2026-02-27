import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clients',
    loadChildren: () => import('./features/clients/clients.routes').then((m) => m.CLIENTS_ROUTES),
  },
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'clients',
  },
];
