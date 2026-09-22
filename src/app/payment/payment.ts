import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
import { PaymentService } from '../services/payment.service';

declare var Razorpay: any;

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
export class Payment implements OnInit {
    readonly cartService = inject(CartService);
    readonly paymentService = inject(PaymentService);
    private readonly orderService = inject(OrderService);
    private readonly router = inject(Router);

    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;

    payableTotal = 0;
    loading = false;

    ngOnInit(): void {
        this.payableTotal = this.cartService.payableTotal();
    }

    pay(): void {
        this.loading = true;
        // Convert ₹ to paise
        const amount = Math.round(this.payableTotal * 100);
        this.paymentService.createOrder(amount).subscribe({
            next: (response) => {
                this.loading = false;
                if (!response.success) {
                    alert('Unable to create order');
                    return;
                }
                this.openRazorpayCheckout(response);
            },
            error: (error) => {
                this.loading = false;
                console.error('Order creation failed', error);
                alert('Unable to create payment order');
            }
        });
    }

    private openRazorpayCheckout(order: any): void {
        const options = {
            key: 'rzp_test_TeyOJ3X0Iu4ohh',
            amount: order.amount,
            currency: order.currency,
            name: 'Pharma Application',
            description: 'Test Payment',
            order_id: order.orderId,
            handler: (response: any) => {
                this.verifyPayment(response);
            },
            prefill: {
                name: 'Test User',
                email: 'test@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#3399cc'
            },
            modal: {
                ondismiss: () => {
                    console.log('Payment popup closed');
                }
            }
        };
        const razorpay = new Razorpay(options);
        razorpay.open();
    }

    private verifyPayment(response: any): void {
        const data = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
        };

        this.paymentService.verifyPayment(data).subscribe({
            next: (result: any) => {
                if (result.success) {
                    this.orderService.setPaymentInfo(data);
                    this.router.navigate(['/order']);
                } else {
                    alert('Payment verification failed');
                }
            },
            error: (error) => {
                console.error('Verification failed', error);
                alert('Unable to verify payment');
            }
        });
    }
}