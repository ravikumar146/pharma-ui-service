import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { BRAND_NAME, NAVIGATION_LINKS } from '../config/app-navigation';

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrl: './login.scss',
    imports: [CommonModule, FormsModule, Header, Footer, RouterLink],
    standalone: true,
})
export class Login {
    readonly brandName = BRAND_NAME;
    readonly navigationLinks = NAVIGATION_LINKS;
    email = '';
    password = '';
    submitted = false;

    submit(): void {
        this.submitted = true;
    }
}
