import { Injectable } from '@angular/core';
import { IShippingStrategy } from '../models/shipping-strategy.model';

@Injectable({
  providedIn: 'root',
})
export class ShippingContextService implements IShippingStrategy {
  private strategy!: IShippingStrategy;

  public hasChosenStrategy(): boolean {
    return !!this.strategy;
  }

  public setStrategy(strategy: IShippingStrategy): void {
    this.strategy = strategy;
  }

  public getType(): string {
    return this.strategy.getType();
  }

  public getCost(): string {
    return this.strategy.getCost();
  }

  public getEstimatedTime(): string {
    return this.strategy.getEstimatedTime();
  }
}
