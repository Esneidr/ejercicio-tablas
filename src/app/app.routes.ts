import { Routes } from '@angular/router';
import { PersonasComponent } from './componentes/personas/personas.component';
import { CarsComponent } from './componentes/cars/cars.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'persons',
        component: PersonasComponent,
      },
      {
        path: 'cars',
        component: CarsComponent,
      },
    ],
  },
];
