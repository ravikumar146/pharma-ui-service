import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrl: './header.scss',
    imports: [RouterLink],
    standalone: true,
})
export class Header {
    @Input() brandName = '';
    @Input() navigationLinks: readonly string[] = [];
    @Input() cartCount = 0;

    routeFor(link: string): string {
        const routes: Record<string, string> = {
            Home: '/',
            Landing: '/',
            Products: '/products',
            Offers: '/offers',
            Login: '/login',
            'Sign up': '/signup',
        };

        return routes[link] ?? '/';
    }
}
