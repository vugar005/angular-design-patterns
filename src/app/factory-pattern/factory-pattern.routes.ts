import { Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: 'notes',
    component: NotesComponent,
  },
];
