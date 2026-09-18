import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { ShopService } from '../services/shop.service';
import { CartService } from '../services/cart.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

@Component({
    selector: 'app-products',
    templateUrl: './products.html',
    styleUrl: './products.scss',
    imports: [CommonModule, FormsModule, Header, Footer],
    standalone: true,
})
export class Products implements OnInit {
    private readonly shopService = inject(ShopService);
    readonly cartService = inject(CartService);
    private readonly changeDetector = inject(ChangeDetectorRef);

    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;
    readonly sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest'];
    readonly searchPlaceholder = '🔍 Search medicines, vitamins, skincare...';

    searchText = '';
    selectedCategory = 'All Products';
    selectedSort = 'Popular';
    currentPage = 1;
    readonly pageSize = 6;
    categories: Category[] = [];
    products: Product[] = [];

    ngOnInit(): void {
        this.shopService.getShopData().subscribe(({ categories, products }) => {
            this.categories = [{ name: 'All Products', icon: '' }, ...categories];
            this.products = products;
            this.changeDetector.markForCheck();
        });
    }

    get filteredProducts(): Product[] {
        const query = this.searchText.trim().toLowerCase();
        const filtered = this.products.filter((product) => {
            const matchesQuery =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query);
            const matchesCategory =
                this.selectedCategory === 'All Products' || product.category === this.selectedCategory;
            return matchesQuery && matchesCategory;
        });

        switch (this.selectedSort) {
            case 'Price: Low to High':
                return [...filtered].sort((a, b) => a.price - b.price);
            case 'Price: High to Low':
                return [...filtered].sort((a, b) => b.price - a.price);
            default:
                return filtered;
        }
    }

    get paginatedProducts(): Product[] {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
    }

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
    }

    get pageNumbers(): number[] {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }

    selectCategory(category: string): void {
        this.selectedCategory = category;
        this.goToFirstPage();
    }

    goToFirstPage(): void {
        this.currentPage = 1;
    }

    goToPage(page: number): void {
        this.currentPage = Math.min(Math.max(page, 1), this.totalPages);
    }

    nextPage(): void {
        this.goToPage(this.currentPage + 1);
    }

    previousPage(): void {
        this.goToPage(this.currentPage - 1);
    }

    addToCart(product: Product): void {
        this.cartService.add(product);
    }

    getQuantity(productName: string): number {
        return this.cartService.items().find((item) => item.product.name === productName)?.quantity ?? 0;
    }

    removeFromCart(productName: string): void {
        this.cartService.remove(productName);
    }
}
