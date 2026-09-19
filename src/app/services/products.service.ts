import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/products-reponse.model';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private readonly http = inject(HttpClient);

    getProducts(): Observable<ProductsResponse> {
        return this.http.get<ProductsResponse>('/assets/products-data.json');
    }
}
