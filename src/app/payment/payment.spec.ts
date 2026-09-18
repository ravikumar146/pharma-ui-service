import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Payment } from './payment';

describe('Payment', () => {
    let component: Payment;
    let fixture: ComponentFixture<Payment>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Payment],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(Payment);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create with card payment selected by default', () => {
        expect(component).toBeTruthy();
        expect(component.selectedMethod).toBe('card');
        expect(fixture.nativeElement.textContent).toContain('Cards');
    });

    it('should switch between payment options', () => {
        component.selectMethod('upi');
        fixture.detectChanges();

        expect(component.selectedMethod).toBe('upi');
        expect(fixture.nativeElement.textContent).toContain('UPI ID');
    });

    it('should show payment confirmation after submission', () => {
        component.selectMethod('cod');
        component.completePayment();

        expect(component.paymentSubmitted).toBe(true);
    });
});
