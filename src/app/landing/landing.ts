import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Specialties } from '../specialties/specialties';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  imports: [CommonModule, Header, Footer, Specialties],
})
export class Landing {
  readonly cartService = inject(CartService);

  readonly brandName = BRAND_NAME;
  readonly navigationLinks = NAVIGATION_LINKS;
}
