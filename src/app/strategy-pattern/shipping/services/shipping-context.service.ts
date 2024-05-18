import { Injectable } from '@angular/core';
import { IShippingStrategy } from '../models/shipping-strategy.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingContextService {
  private strategy!: IShippingStrategy;

  constructor() { }

  public setStrategy(strategy: IShippingStrategy): void {
    this.strategy = strategy;
  }
}
