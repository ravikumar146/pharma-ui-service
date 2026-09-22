import { Injectable, signal } from '@angular/core';

import { CartService } from './cart.service';
import { Order, OrderItem } from '../models/order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private readonly currentOrder = signal<Order | null>(null);
    private paymentInfo = new BehaviorSubject<any>(null);
    readonly order = this.currentOrder.asReadonly();

    constructor(
        private readonly cartService: CartService,
    ) { }

    setPaymentInfo(data: any): void {
        this.paymentInfo.next(data);
    }

    getPaymentInfo(): Observable<any> {
        return this.paymentInfo.asObservable();
    }

    createOrder(paymentMethod: string): Order {
        const items: OrderItem[] = this.cartService
            .items()
            .map((item) => ({
                product: item.product,
                quantity: item.quantity,
            }));

        const order: Order = {
            id: this.generateOrderId(),

            createdAt: new Date().toISOString(),

            status: 'confirmed',

            items,

            paymentMethod,

            subtotal: this.cartService.total(),

            discount: this.cartService.discountAmount(),

            delivery: 0,

            total: this.cartService.payableTotal(),

            estimatedDelivery: this.getEstimatedDelivery(),
        };

        this.currentOrder.set(order);

        return order;
    }

    clearOrder(): void {
        this.currentOrder.set(null);
    }

    private generateOrderId(): string {
        const randomPart = Math.floor(
            100000 + Math.random() * 900000,
        );

        return `MED-${randomPart}`;
    }

    private getEstimatedDelivery(): string {
        const date = new Date();

        date.setDate(date.getDate() + 3);

        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }
}