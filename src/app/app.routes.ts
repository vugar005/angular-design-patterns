import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'strategy',
    pathMatch: 'full',
  },
  {
    path: 'strategy',
    loadChildren: () =>
      import('./strategy-pattern/strategy-pattern.routes').then((item) => item.routes),
  },
  {
    path: 'factory',
    loadChildren: () =>
      import('./factory-pattern/factory-pattern.routes').then((item) => item.routes),
  },
];
