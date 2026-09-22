import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../services/order.service';
import { FormsModule } from '@angular/forms';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';
import { CartService } from '../services/cart.service';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Footer,
    RouterLink,
  ],
  selector: 'app-order',
  styleUrl: './order.scss',
  templateUrl: './order.html',
})
export class Order implements OnInit {
  private readonly orderService = inject(OrderService);
  readonly cartService = inject(CartService);
  readonly brandName = BRAND_NAME;
  readonly navigationLinks = NAVIGATION_LINKS;

  readonly order = this.orderService.order;

  readonly currentStep = computed(() => {
    switch (this.order()?.status) {
      case 'confirmed':
        return 1;

      case 'processing':
        return 2;

      case 'shipped':
        return 3;

      case 'delivered':
        return 4;

      default:
        return 0;
    }
  });

  ngOnInit(): void {
    this.orderService.getPaymentInfo().subscribe(data => {
      console.log('Payment data:', data);
    });
  }
}
