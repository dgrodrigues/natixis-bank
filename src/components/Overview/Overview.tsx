import { useContext, useEffect, useState } from 'react'
import type { User, ErrorResponse, TransactionsHistory, Transaction } from '../../types/api';
import HistoryList from '../HistoryList/HistoryList';
import TransactionDetail from '../TransactionDetail/TransactionDetail';
import { TransactionsContext } from '../../context/context';

import './Overview.styles.css';

export interface OverviewProps {
    token: string;
    user: User;
    logout: () => void;
}

const Overview = ({ token, user, logout }: OverviewProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const { dispatch, state: history } = useContext(TransactionsContext);

    const fetchHistory = async () => {
        const res = await fetch('/history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = (await res.json()) as TransactionsHistory | ErrorResponse

        if (res.ok) {
            dispatch({ type: 'INITIAL', payload: data as TransactionsHistory });
        } else {
            const errorData = data as ErrorResponse
            throw new Error(errorData.message);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (token) {
            fetchHistory();
        }
    }, [token]);

    return (
        <div className='overview-container'>
            <div className='overview-header'>
                <div className='overview-header-info'>
                    <div className='owner-name'>
                        <h1>Hello, {`${user.firstName} ${user.lastName}`}!</h1>
                    </div>
                    <div className='owner-balance'>
                        <span>Current Balance</span>
                        <p>{`${history?.balance || 0} €`}</p>
                    </div>
                    <div className='owner-logout'>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
            <div className={`overview-history ${isLoading ? 'loading' : ''}`}>
                {!isLoading && (
                    <>
                        <HistoryList
                            transactions={history?.transactions}
                            setSelectedTransaction={setSelectedTransaction}
                            selectedTransaction={selectedTransaction} />
                        {selectedTransaction !== null && <TransactionDetail transaction={selectedTransaction} />}
                        {selectedTransaction === null && <div className='overview-history-detail-empty'>
                            <p>Select a transaction from the list to view more details.</p>
                        </div>}
                    </>
                )}
                {isLoading && <div className='loading'>Loading...</div>}
            </div>
        </div>
    )
}

export default Overview;