import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly http = inject(HttpClient);
    appName: string | undefined;

    getCategories(): Observable<Category[]> {
        this.appName = environment.appName;
        return this.http.get<Category[]>(`${environment.categoryServiceUrl}/list/${this.appName}`);
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>('/assets/products-data.json');
    }
}
