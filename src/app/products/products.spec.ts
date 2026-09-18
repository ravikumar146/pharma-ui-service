import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Products } from './products';
import { ShopService } from '../services/shop.service';

const product = (name: string, category: string, price: number) => ({
    name,
    description: `${name} description`,
    price,
    rating: '★★★★★',
    icon: '💊',
    color: 'green-bg',
    category,
});

describe('Products', () => {
    let component: Products;
    let fixture: ComponentFixture<Products>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Products],
            providers: [
                provideRouter([]),
                {
                    provide: ShopService,
                    useValue: {
                        getShopData: () =>
                            of({
                                categories: [{ name: 'Wellness', icon: '🌿' }],
                                products: [
                                    product('Daily Multivitamins', 'Wellness', 299),
                                    product('Omega 3 Softgels', 'Wellness', 499),
                                    product('Moisturizing Lotion', 'Personal Care', 249),
                                    product('Digital Thermometer', 'Health Devices', 399),
                                    product('First Aid Kit', 'First Aid', 549),
                                    product('Glucose Monitoring Kit', 'Diabetes Care', 899),
                                    product('Pain Relief Balm', 'Medicines', 119),
                                ],
                            }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Products);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create and load products from the shop service', () => {
        expect(component).toBeTruthy();
        expect(component.products.length).toBe(7);
        expect(component.categories.length).toBe(2);
    });

    it('should filter products by category and paginate the result', () => {
        component.selectCategory('Wellness');

        expect(component.filteredProducts.length).toBe(2);
        expect(component.paginatedProducts.length).toBe(2);
        expect(component.currentPage).toBe(1);
    });

    it('should add a product to the shared cart', () => {
        component.addToCart(component.products[0]);

        expect(component.cartService.itemCount()).toBe(1);
        expect(component.cartService.items()[0].product.name).toBe('Daily Multivitamins');
        expect(component.getQuantity('Daily Multivitamins')).toBe(1);

        component.addToCart(component.products[0]);
        expect(component.getQuantity('Daily Multivitamins')).toBe(2);

        component.removeFromCart('Daily Multivitamins');
        expect(component.getQuantity('Daily Multivitamins')).toBe(1);
    });
});
