import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { TransactionsReducer } from './reducer';
import { TransactionsHistory, TransactionAction } from '../types/api';

const initialState: TransactionsHistory = {
    balance: 0,
    transactions: [],
};

interface TransactionsContextProps {
    state: TransactionsHistory;
    dispatch: Dispatch<TransactionAction>;
}

export const TransactionsContext = createContext<TransactionsContextProps>({
    state: initialState,
    dispatch: () => null,
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(TransactionsReducer, initialState);

    return (
        <TransactionsContext.Provider value={{ state, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    );
};