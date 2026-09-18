import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
    imports: [RouterLink],
    standalone: true,
})
export class Footer {
    readonly quickLinks = [
        { label: 'Home', route: '/' },
        { label: 'Products', route: '/products' },
        { label: 'Cart', route: '/cart' },
    ];
}
