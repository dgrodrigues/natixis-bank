import { ChangeEvent, useState } from 'react';
import type { Transaction, TransactionType } from '../../types/api';
import HistoryItem from '../HistoryItem/HistoryItem';
import Withdraw from '../Withdraw/Withdraw';
import Deposit from '../Deposit/Deposit';

import './HistoryList.styles.css';

export interface OverviewProps {
    transactions?: Transaction[];
    setSelectedTransaction: (transaction: Transaction | null) => void;
    selectedTransaction?: Transaction | null;
}

const HistoryList = ({ transactions, setSelectedTransaction, selectedTransaction }: OverviewProps) => {
    const [category, setCategories] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<TransactionType | null>(null);

    const categories = [...new Set(transactions?.map(transaction => transaction.category))];

    const changeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategories(event.target.value);
    }

    const toggleTypeFilter = (type: TransactionType) => {
        if (type === typeFilter) {
            setTypeFilter(null);
        } else {
            setTypeFilter(type);
        }
    }

    const filteredCategoryTransactions = transactions?.filter(transaction => {
        if (category === "all") {
            return true;
        }
        if (transaction.category === category) {
            return true;
        }
        return false;
    }) || [];

    const filteredTypeTransactions = filteredCategoryTransactions.filter(transaction => {
        if (typeFilter === null) {
            return true;
        }
        if (transaction.type === typeFilter) {
            return true;
        }
        return false;
    }) || [];


    const orderedTransations = filteredTypeTransactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className='overview-history-list'>
            <div className='filters'>
                <div className='owner-actions'>
                    <Withdraw categories={categories} />
                    <Deposit categories={categories} />
                </div>
                <div className='filter-type'>
                    <button
                        onClick={() => toggleTypeFilter('Deposit')}
                        className={typeFilter === 'Deposit' ? 'active' : ''}>
                        Deposit
                    </button>
                    <button
                        onClick={() => toggleTypeFilter('Withdrawal')}
                        className={typeFilter === 'Withdrawal' ? 'active' : ''}>
                        Withdrawal
                    </button>
                    <button
                        onClick={() => toggleTypeFilter('Transfer')}
                        className={typeFilter === 'Transfer' ? 'active' : ''}>
                        Transfer
                    </button>
                </div>
                <select className='filter-category' onChange={changeCategory}>
                    <option value="all">All Categories</option>
                    {categories?.map((category, index) =>
                        <option key={index} value={category}>
                            {category}
                        </option>
                    )}
                </select>
            </div>
            {orderedTransations?.map((transaction =>
                <HistoryItem
                    key={transaction.id}
                    transaction={transaction}
                    isSelected={selectedTransaction?.id === transaction.id}
                    setSelectedTransaction={setSelectedTransaction}
                />)
            )}
        </div>
    )
}

export default HistoryList;