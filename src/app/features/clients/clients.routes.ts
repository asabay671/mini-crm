import { Routes } from '@angular/router';
import { ClientsListPage } from './pages/client-list/clients-list.page';
import { ClientFormPage } from './pages/client-form/client-form.page';

export const CLIENTS_ROUTES: Routes = [
  {
    path: '',
    component: ClientsListPage,
  },
  {
    path: 'new',
    component: ClientFormPage,
  },
  {
    path: ':id',
    component: ClientFormPage,
  },
];
