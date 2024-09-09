export interface Reservation {
    reservation_uuid: string;
    activePurchases: number;
    sumOfActiveCharges: number;
}

export interface Charge {
    productName: string,
    status: string,
    charge: number,
}
