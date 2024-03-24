export interface PaymentType {
  name: string,
  amount: number,
  description: string,
  currency: string
}

export interface PaymentTypeFull {
  id: number,
  name: string,
  amount: number,
  description: string,
  currency: string
}