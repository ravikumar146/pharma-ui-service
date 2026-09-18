import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { Coupon } from '../models/coupon.model';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly cartItems = signal<CartItem[]>([]);

    readonly items = this.cartItems.asReadonly();
    readonly itemCount = computed(() =>
        this.cartItems().reduce((total, item) => total + item.quantity, 0),
    );
    readonly total = computed(() =>
        this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
    );
    readonly appliedCoupon = signal<Coupon | null>(null);
    readonly discountAmount = computed(() => {
        const coupon = this.appliedCoupon();
        if (!coupon) {
            return 0;
        }

        return coupon.type === 'percentage'
            ? (this.total() * coupon.value) / 100
            : Math.min(coupon.value, this.total());
    });
    readonly payableTotal = computed(() => Math.max(0, this.total() - this.discountAmount()));

    applyCoupon(coupon: Coupon): void {
        this.appliedCoupon.set(coupon);
    }

    clearCoupon(): void {
        this.appliedCoupon.set(null);
    }

    add(product: Product): void {
        this.cartItems.update((items) => {
            const existingItem = items.find((item) => item.product.name === product.name);

            if (existingItem) {
                return items.map((item) =>
                    item.product.name === product.name
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            return [...items, { product, quantity: 1 }];
        });
    }

    remove(productName: string): void {
        this.cartItems.update((items) =>
            items
                .map((item) =>
                    item.product.name === productName
                        ? { ...item, quantity: item.quantity - 1 }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    }
}
