import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Signup } from './signup';

describe('Signup', () => {
    let component: Signup;
    let fixture: ComponentFixture<Signup>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Signup],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(Signup);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should submit account creation data', () => {
        component.name = 'Test User';
        component.mobileNumber = '9876543210';
        component.email = 'user@example.com';
        component.password = 'password123';
        component.submit();

        expect(component.submitted).toBe(true);
    });
});
