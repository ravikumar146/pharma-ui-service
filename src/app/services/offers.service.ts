import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OffersResponse } from '../models/offers-response.model';

@Injectable({
    providedIn: 'root',
})
export class OffersService {
    private readonly http = inject(HttpClient);

    getOffers(): Observable<OffersResponse> {
        return this.http.get<OffersResponse>('/assets/offers.json');
    }
}
