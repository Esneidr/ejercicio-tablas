import { Routes } from '@angular/router';
import { PersonasComponent } from './componentes/personas/personas.component';
import { CarsComponent } from './componentes/cars/cars.component';

export const routes: Routes = [
  {
    path: 'Persons',
    component: PersonasComponent
  },
  {
    path: 'Cars',
    component: CarsComponent
  }
];
