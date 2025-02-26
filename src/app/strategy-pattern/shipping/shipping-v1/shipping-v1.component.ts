import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EconomyShippingService } from '../services/economy-shipping.service';
import { ExpressShippingService } from '../services/express-shipping.service';
@Component({
  selector: 'app-shipping-v1',
  standalone: true,
  imports: [NgIf, NgFor, MatFormFieldModule, MatSelectModule],
  templateUrl: './shipping-v1.component.html',
  styleUrl: './shipping-v1.component.scss',
})
export class ShippingV1Component {
  public readonly shippingOptions = ['EXPRESS', 'ECONOMY'];
  public selectedOption!: string;
  public type?: string;
  public cost?: string;
  public estimatedTime?: string;

  constructor(
    private readonly expressShippping: ExpressShippingService,
    private readonly economyShipping: EconomyShippingService
  ) {}

  public onStrategyChange(option: string): void {
    this.selectedOption = option;
    this.getData(option);
  }

  private getData(option: string): void {
    if (option === 'EXPRESS') {
      this.type = this.expressShippping.getType();
      this.cost = this.expressShippping.getCost();
      this.estimatedTime = this.expressShippping.getEstimatedTime();
    } else if (option === 'ECONOMY') {
      this.type = this.economyShipping.getType();
      this.cost = this.economyShipping.getCost();
      this.estimatedTime = this.economyShipping.getEstimatedTime();
    }
  }
}
