import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Header],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        component.brandName = 'Medicare+';
        component.navigationLinks = ['Home', 'Landing'];
        component.cartCount = 3;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the brand, navigation links, and cart count', () => {
        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('.logo')?.textContent).toContain('Medicare+');
        expect(element.querySelector('.nav-links')?.textContent).toContain('Landing');
        expect(element.querySelector('.cart-btn')?.textContent).toContain('3');
    });
});
