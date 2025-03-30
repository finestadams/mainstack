export interface User {
    first_name: string;
    last_name: string;
    email: string;
}
  
export interface Wallet {
    balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
    ledger_balance: number;
}
  
export interface Metadata {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name?: string; 
  }
  
  export interface Transaction {
    amount: number;
    metadata?: Metadata;
    payment_reference?: string; 
    status: string;
    type: string;
    date: string;
  }