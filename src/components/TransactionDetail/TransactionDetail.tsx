import type { Transaction } from '../../types/api';
import { formatDate } from '../../utils/utils';
import './TransactionDetail.styles.css';

export interface TransactionDetailProps {
    transaction: Transaction;
}

const TransactionDetail = ({ transaction }: TransactionDetailProps) => {
    return (
        <div className='overview-history-detail'>
            <h3 className='transaction-info-name'>
                {transaction.description}
            </h3>

            <div className='transaction-info'>
                <span className='info-title'>Date: </span>
                <span>{formatDate(transaction.date)}</span>
            </div>

            <div className='transaction-info'>
                <span className='info-title'>Balance after: </span>
                <span>{`${transaction.balance}€`}</span>
            </div>

            <div className='transaction-info'>
                <span className='info-title'>Amount: </span>
                <span>
                    {`${transaction.moneyFlow === 'out' ? '-' : '+'}${transaction.amount}€`}
                </span>
            </div>

            <div className='transaction-info'>
                <span className='info-title'>Category: </span>
                <span>{transaction.category}</span>
            </div>

            <div className='transaction-info'>
                <span className='info-title'>Type: </span>
                <span>{transaction.type}</span>
            </div>
        </div >
    )
}

export default TransactionDetail;