import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Cart } from './cart';
import { Product } from '../models/product.model';
import { OffersService } from '../services/offers.service';

const testProduct: Product = {
    name: 'Daily Multivitamins',
    description: 'Daily wellness supplement',
    price: 299,
    rating: '★★★★★',
    icon: '💊',
    color: 'green-bg',
    category: 'Wellness',
};

describe('Cart', () => {
    let component: Cart;
    let fixture: ComponentFixture<Cart>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Cart],
            providers: [
                provideRouter([]),
                {
                    provide: OffersService,
                    useValue: {
                        getOffers: () =>
                            of({
                                coupons: [
                                    {
                                        code: 'WELCOME10',
                                        title: '10% off your order',
                                        description: 'Save 10% on orders above ₹100.',
                                        type: 'percentage',
                                        value: 10,
                                        minimumOrder: 100,
                                    },
                                ],
                            }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Cart);
        component = fixture.componentInstance;
        component.cartService.add(testProduct);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display added products and their totals', () => {
        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('.cart-list')?.textContent).toContain('Daily Multivitamins');
        expect(element.querySelector('.item-count')?.textContent).toContain('1');
        expect(element.querySelector('.summary-card')?.textContent).toContain('299');
    });

    it('should remove a product from the cart', () => {
        component.cartService.remove(testProduct.name);
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.empty-cart')).toBeTruthy();
    });

    it('should apply an eligible coupon and reduce the payable total', () => {
        component.couponCode = 'WELCOME10';
        component.applyCoupon();

        expect(component.appliedCoupon?.code).toBe('WELCOME10');
        expect(component.discountAmount).toBe(29.9);
        expect(component.payableTotal).toBe(269.1);
    });
});
