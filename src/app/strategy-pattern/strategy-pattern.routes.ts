import { Routes } from '@angular/router';
import { ShippingV2Component } from './shipping/shipping-v2/shipping-v2.component';
import { ShippingV1Component } from './shipping/shipping-v1/shipping-v1.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shipping',
    pathMatch: 'full',
  },
  {
    path: 'shipping',
    component: ShippingV1Component,
  },
];
