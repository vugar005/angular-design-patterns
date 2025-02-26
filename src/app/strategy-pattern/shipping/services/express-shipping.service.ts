import { Injectable } from '@angular/core';
import { IShippingStrategy } from '../models/shipping-strategy.model';

@Injectable({
  providedIn: 'root'
})
export class ExpressShippingService implements IShippingStrategy {
  public getType(): string {
    return 'EXPRESS';
  }

  public getCost(): string {
    return '100$';
  };

  public getEstimatedTime(): string {
    return '1-2 days';
  };

}
