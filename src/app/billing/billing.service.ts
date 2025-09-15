import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, BillSummary } from './billing.model';

@Injectable({ providedIn: 'root' })
export class BillingService {
  private products: Product[] = [];
  private discountRate = 0;

  private productSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productSubject.asObservable();

  addProduct(product: Product) {
    const existing = this.products.find(p => p.name.toLowerCase() === product.name.toLowerCase());
    if (existing) {
      existing.qty += product.qty;
    } else {
      this.products.push(product);
    }
    this.productSubject.next([...this.products]);
  }

  updateQty(id: number, qty: number) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      product.qty = qty > 0 ? qty : 1;
      this.productSubject.next([...this.products]);
    }
  }

  removeProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    this.productSubject.next([...this.products]);
  }

  setDiscount(rate: number) {
    this.discountRate = rate;
  }

  getBillSummary(): BillSummary {
    const subTotal = this.products.reduce((sum, p) => sum + p.price * p.qty, 0);
    const discount = (subTotal * this.discountRate) / 100;
    return { subTotal, discount, grandTotal: subTotal - discount };
  }
}
