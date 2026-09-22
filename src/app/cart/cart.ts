import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Coupon } from '../models/coupon.model';
import { OffersService } from '../services/offers.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Router, RouterLink } from '@angular/router';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.html',
    styleUrl: './cart.scss',
    imports: [CommonModule, FormsModule, Header, Footer, RouterLink],
    standalone: true,
})
export class Cart implements OnInit {
    readonly cartService = inject(CartService);
    private readonly offersService = inject(OffersService);
    private readonly changeDetector = inject(ChangeDetectorRef);
    private readonly router = inject(Router);
    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;

    coupons: Coupon[] = [];
    couponCode = '';
    appliedCoupon: Coupon | null = null;
    couponMessage = '';
    couponError = false;

    ngOnInit(): void {
        this.offersService.getOffers().subscribe(response => {
            this.coupons = response;
            this.changeDetector.markForCheck();
        });
    }

    get discountAmount(): number {
        return this.cartService.discountAmount();
    }

    get payableTotal(): number {
        return this.cartService.payableTotal();
    }

    applyCoupon(coupon?: Coupon): void {
        const code = (coupon?.code ?? this.couponCode).trim().toUpperCase();
        const matchingCoupon = this.coupons.find((availableCoupon) => availableCoupon.code === code);

        if (!matchingCoupon) {
            this.appliedCoupon = null;
            this.cartService.clearCoupon();
            this.couponError = true;
            this.couponMessage = 'That coupon code is not available.';
            return;
        }

        if (this.cartService.total() < matchingCoupon.minimumOrder) {
            this.appliedCoupon = null;
            this.couponError = true;
            this.couponMessage = `Add ₹${matchingCoupon.minimumOrder - this.cartService.total()} more to use ${matchingCoupon.code}.`;
            return;
        }

        this.appliedCoupon = matchingCoupon;
        this.cartService.applyCoupon(matchingCoupon);
        this.couponCode = matchingCoupon.code;
        this.couponError = false;
        this.couponMessage = `${matchingCoupon.code} applied. You saved ₹${this.discountAmount}.`;
    }

    addItem(productName: string): void {
        const item = this.cartService.items().find((cartItem) => cartItem.product.name === productName);
        if (item) {
            this.cartService.add(item.product);
        }
    }

    removeItem(productName: string): void {
        this.cartService.remove(productName);
        if (this.appliedCoupon && this.cartService.total() < this.appliedCoupon.minimumOrder) {
            this.appliedCoupon = null;
            this.cartService.clearCoupon();
            this.couponMessage = 'Coupon removed because the order no longer meets its minimum.';
            this.couponError = true;
        }
    }

    proceedToPayment(): void {
        this.router.navigate(['/payment']);
    }
}
