import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaymentOrderResponse } from '../models/payment-order-reponse';

@Injectable({
    providedIn: 'root',
})
export class PaymentService {
    private readonly http = inject(HttpClient);

    createOrder(amount: number): Observable<PaymentOrderResponse> {
        return this.http.post<PaymentOrderResponse>(`${environment.paymentServiceUrl}/create`, { amount: amount });
    }

    verifyPayment(data: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string; }) {
        return this.http.post(`${environment.paymentServiceUrl}/verify`, data);
    }
}