import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Footer } from './footer';

describe('Footer', () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Footer],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the brand and copyright text', () => {
        const element = fixture.nativeElement as HTMLElement;

        expect(element.querySelector('strong')?.textContent).toContain('Medicare+');
        expect(element.textContent).toContain('Medicare Pharmacy');
    });
});
