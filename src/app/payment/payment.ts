import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
    imports: [CommonModule, FormsModule, Header, Footer, RouterLink],
    standalone: true,
})
export class Payment {
    readonly cartService = inject(CartService);
    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;
    selectedMethod: PaymentMethod = 'card';
    paymentSubmitted = false;
    cardNumber = '';
    cardName = '';
    expiry = '';
    cvv = '';
    upiId = '';
    bank = '';
    wallet = '';

    selectMethod(method: PaymentMethod): void {
        this.selectedMethod = method;
        this.paymentSubmitted = false;
    }

    completePayment(): void {
        this.paymentSubmitted = true;
    }
}
