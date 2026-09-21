import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OffersService {
    private readonly http = inject(HttpClient);

    getOffers(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>(`${environment.couponServiceUrl}/coupons/list`);
    }
}
