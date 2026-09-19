import { Product } from './product.model';

export type OrderStatus =
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered';

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface Order {
    id: string;
    createdAt: string;
    status: OrderStatus;
    items: OrderItem[];
    paymentMethod: string;
    subtotal: number;
    discount: number;
    delivery: number;
    total: number;
    estimatedDelivery: string;
}