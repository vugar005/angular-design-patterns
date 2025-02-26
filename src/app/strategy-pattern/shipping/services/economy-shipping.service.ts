import { Injectable } from '@angular/core';
import { IShippingStrategy } from '../models/shipping-strategy.model';

@Injectable({
  providedIn: 'root',
})
export class EconomyShippingService implements IShippingStrategy {
  public getType(): string {
    return 'ECONOMY';
  }

  public getCost(): string {
    return '15$';
  }

  public getEstimatedTime(): string {
    return '5-12 days';
  }
}
