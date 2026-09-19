import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { Landing } from './landing/landing';
import { Products } from './products/products';
import { Offers } from './offers/offers';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Payment } from './payment/payment';
import { Order } from './order/order';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'products', component: Products },
    { path: 'offers', component: Offers },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },
    { path: 'cart', component: Cart },
    { path: 'payment', component: Payment },
    { path: 'order', component: Order },
    { path: '**', redirectTo: '' },
];
