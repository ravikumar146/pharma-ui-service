import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import {
    BRAND_NAME,
    NAVIGATION_LINKS,
} from '../config/app-navigation';

type PaymentMethod =
    | 'card'
    | 'upi'
    | 'netbanking'
    | 'wallet'
    | 'cod';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
    imports: [
        CommonModule,
        FormsModule,
        Header,
        Footer,
        RouterLink,
    ],
    standalone: true,
})
export class Payment {
    readonly cartService = inject(CartService);
    private readonly orderService = inject(OrderService);
    private readonly router = inject(Router);

    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;

    selectedMethod: PaymentMethod = 'card';

    cardNumber = '';
    cardName = '';
    expiry = '';
    cvv = '';

    upiId = '';
    bank = '';
    wallet = '';

    selectMethod(method: PaymentMethod): void {
        this.selectedMethod = method;
    }

    completePayment(): void {
        /*
         * Prevent creating an order if the cart is empty.
         */
        if (this.cartService.itemCount() === 0) {
            this.router.navigate(['/cart']);
            return;
        }

        /*
         * Create the order BEFORE clearing the cart.
         *
         * OrderService takes a snapshot of the current cart items,
         * subtotal, discount and payable total.
         */
        this.orderService.createOrder(
            this.getPaymentMethodName(),
        );

        /*
         * The order now has its own copy of the cart data,
         * so it is safe to empty the shopping cart.
         */
        this.cartService.clear();

        /*
         * Show the newly created order.
         */
        this.router.navigate(['/order']);
    }

    private getPaymentMethodName(): string {
        switch (this.selectedMethod) {
            case 'card':
                return 'Credit / Debit Card';

            case 'upi':
                return 'UPI';

            case 'netbanking':
                return 'Net Banking';

            case 'wallet':
                return 'Wallet';

            case 'cod':
                return 'Cash on Delivery';

            default:
                return 'Payment';
        }
    }
}