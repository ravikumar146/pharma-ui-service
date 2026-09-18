import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Coupon } from '../models/coupon.model';
import { OffersService } from '../services/offers.service';
import { CartService } from '../services/cart.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.html',
    styleUrl: './offers.scss',
    imports: [CommonModule, Header, Footer],
    standalone: true,
})
export class Offers implements OnInit {
    private readonly offersService = inject(OffersService);
    private readonly changeDetector = inject(ChangeDetectorRef);
    readonly cartService = inject(CartService);

    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;
    coupons: Coupon[] = [];
    copiedCode = '';
    isLoading = true;

    ngOnInit(): void {
        this.offersService.getOffers().subscribe(({ coupons }) => {
            this.coupons = coupons;
            this.isLoading = false;
            this.changeDetector.markForCheck();
        });
    }

    discountLabel(coupon: Coupon): string {
        return coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`;
    }

    copyCoupon(code: string): void {
        this.copiedCode = code;
        navigator.clipboard?.writeText(code);
    }
}
