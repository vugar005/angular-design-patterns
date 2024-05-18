import { NgFor, NgIf } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EconomyShippingService } from '../services/economy-shipping.service';
import { ExpressShippingService } from '../services/express-shipping.service';
import { ShippingContextService } from '../services/shipping-context.service';
@Component({
  selector: 'app-shipping-v2',
  standalone: true,
  imports: [NgIf, NgFor, MatFormFieldModule, MatSelectModule],
  templateUrl: './shipping-v2.component.html',
  styleUrl: './shipping-v2.component.scss',
})
export class ShippingV2Component {
  public readonly shippingOptions = ['EXPRESS', 'ECONOMY'];
  public selectedOption!: string;
  public type?: string;
  public cost?: string;
  public estimatedTime?: string;

  constructor(
    private readonly injector: Injector,
    private readonly shippingContext: ShippingContextService
  ) {}

  public onStrategyChange(option: string): void {
    this.selectedOption = option;

    switch (option) {
      case 'EXPRESS': {
        const strategy = this.injector.get(ExpressShippingService);
        this.shippingContext.setStrategy(strategy);
        break;
      }

      case 'ECONOMY': {
        const strategy = this.injector.get(EconomyShippingService);
        this.shippingContext.setStrategy(strategy);
        break;
      }
    }
    this.getData();
  }

  private getData(): void {
    if (!this.shippingContext.hasChosenStrategy) {
      return;
    }
    this.type = this.shippingContext.getType();
    this.cost = this.shippingContext.getCost();
    this.estimatedTime = this.shippingContext.getEstimatedTime();
  }
}
