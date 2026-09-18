export interface Coupon {
    code: string;
    title: string;
    description: string;
    type: 'percentage' | 'fixed';
    value: number;
    minimumOrder: number;
}
