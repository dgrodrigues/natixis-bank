export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface ErrorResponse {
    message: string;
}

export type TransactionType = "Deposit" | "Withdrawal" | "Transfer";

export interface Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    currency: string;
    date: string;
    description: string;
    balance: number;
    category: string;
    moneyFlow: "in" | "out";
}

export interface TransactionsHistory {
    balance: number;
    transactions: Transaction[];
}

export type TransactionAction =
    | { type: "DEPOSIT"; payload: Transaction }
    | { type: "WITHDRAW"; payload: Transaction }
    | { type: "INITIAL"; payload: TransactionsHistory };
