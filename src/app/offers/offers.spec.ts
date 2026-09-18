import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Offers } from './offers';
import { OffersService } from '../services/offers.service';

describe('Offers', () => {
    let component: Offers;
    let fixture: ComponentFixture<Offers>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Offers],
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
                                        description: 'Save 10% on orders above ₹500.',
                                        type: 'percentage',
                                        value: 10,
                                        minimumOrder: 500,
                                    },
                                ],
                            }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Offers);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and load available offers', () => {
        expect(component).toBeTruthy();
        expect(component.coupons.length).toBe(1);
        expect(fixture.nativeElement.textContent).toContain('WELCOME10');
    });

    it('should format percentage and fixed discounts', () => {
        expect(component.discountLabel(component.coupons[0])).toBe('10% OFF');
        expect(component.discountLabel({
            code: 'HEALTH50',
            title: 'Savings',
            description: 'Fixed discount',
            type: 'fixed',
            value: 50,
            minimumOrder: 500,
        })).toBe('₹50 OFF');
    });

    it('should mark a coupon as copied', () => {
        component.copyCoupon('WELCOME10');

        expect(component.copiedCode).toBe('WELCOME10');
    });
});
