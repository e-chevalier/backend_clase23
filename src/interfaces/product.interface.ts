export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly thumbnail: string;
  readonly timestamp: string;
  readonly code: string;
  readonly stock: number;
  readonly qty: number;
}
