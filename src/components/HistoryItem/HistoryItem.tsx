import type { Transaction } from '../../types/api';
import { formatDate } from '../../utils/utils';

import './HistoryItem.styles.css';

export interface HistoryItemProps {
    transaction: Transaction;
    isSelected: boolean;
    setSelectedTransaction: (transaction: Transaction | null) => void;
}

const HistoryItem = ({ transaction, isSelected, setSelectedTransaction }: HistoryItemProps) => {
    return (
        <div
            className={`history-item ${isSelected ? 'selected' : ''}`}
            onClick={() => isSelected ? setSelectedTransaction(null) : setSelectedTransaction(transaction)}>
            <div className='transaction-date'>
                {formatDate(transaction.date)}
            </div>
            <div className='transaction-summary'>
                <div className='transaction-description'>
                    {transaction.description}
                </div>
                <div className='transaction-amounts'>
                    <span className='transaction-amount'>
                        {`${transaction.moneyFlow === 'out' ? '-' : '+'}${transaction.amount}€`}
                    </span>
                    <span className='transaction-balance'>{`${transaction.balance}€`}</span>
                </div>
            </div>
        </div>
    )
}

export default HistoryItem;