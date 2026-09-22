export interface PaymentOrderResponse {
    success: boolean;
    orderId: string;
    amount: string;
    currency: string;
    status: string;
}