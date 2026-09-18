import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopDataResponse } from '../models/shop-data-response.model';

@Injectable({
    providedIn: 'root',
})
export class ShopService {
    private readonly http = inject(HttpClient);

    getShopData(): Observable<ShopDataResponse> {
        return this.http.get<ShopDataResponse>('/assets/shop-data.json');
    }
}
