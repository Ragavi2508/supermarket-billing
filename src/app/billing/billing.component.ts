import { Component } from '@angular/core';
import { BillingService } from './billing.service';
import { Product } from './billing.model';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  products$ = this.billingService.products$;
  discount = 0;

  constructor(private billingService: BillingService) {}

  addProduct(name: string, price: number) {
    if (!name || !price) return;
    const product: Product = {
      id: Date.now(),
      name,
      price,
      qty: 1,
    };
    this.billingService.addProduct(product);
  }

  updateQty(id: number, qty: string) {
    this.billingService.updateQty(id, +qty);
  }

  removeProduct(id: number) {
    this.billingService.removeProduct(id);
  }

  applyDiscount() {
    this.billingService.setDiscount(this.discount);
  }

  get summary() {
    return this.billingService.getBillSummary();
  }
}
