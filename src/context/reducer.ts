import { TransactionAction, TransactionsHistory } from "../types/api";

export const TransactionsReducer = (
    state: TransactionsHistory,
    action: TransactionAction,
): TransactionsHistory => {
    switch (action.type) {
        case "DEPOSIT":
            return {
                balance: state.balance + action.payload.amount,
                transactions: [action.payload, ...state.transactions],
            };
        case "WITHDRAW":
            return {
                balance: state.balance - action.payload.amount,
                transactions: [action.payload, ...state.transactions],
            };
        case "INITIAL":
            return action.payload;
        default:
            return state;
    }
};
