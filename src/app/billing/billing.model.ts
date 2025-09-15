export interface Product {
  id: number;
  name: string;
  price: number;
  qty: number;
}

export interface BillSummary {
  subTotal: number;
  discount: number;
  grandTotal: number;
}
