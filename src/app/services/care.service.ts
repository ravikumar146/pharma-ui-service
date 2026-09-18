import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CareDataResponse } from '../models/care-data-response.model';

@Injectable({
    providedIn: 'root',
})
export class CareService {
    private readonly http = inject(HttpClient);

    getCareData(): Observable<CareDataResponse> {
        return this.http.get<CareDataResponse>('/assets/care-data.json');
    }
}
