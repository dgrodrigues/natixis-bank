import { useState, FormEvent, useContext } from 'react';
import Modal from '../Modal/Modal';
import { TransactionsContext } from '../../context/context';

import './Deposit.styles.css';

export interface DepositProps {
    categories?: string[];
}

const Deposit = ({ categories }: DepositProps) => {
    const [isAddingDeposit, setIsAddingDeposit] = useState(false);
    const { dispatch, state } = useContext(TransactionsContext);

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        dispatch({
            type: 'DEPOSIT', payload: {
                id: Date.now(), // Use timestamp as id since we are using mock data
                type: "Deposit",
                amount: parseFloat(form.amount.value),
                currency: "€",
                date: new Date().toJSON(),
                description: form.description.value,
                balance: state.balance + parseFloat(form.amount.value),
                category: form.category.value,
                moneyFlow: "in"
            }
        });
        setIsAddingDeposit(false);
    }

    return (
        <>
            <button
                className='deposit'
                onClick={() => setIsAddingDeposit(true)}>Deposit</button>
            <Modal isOpen={isAddingDeposit} onClose={() => setIsAddingDeposit(false)}>
                <h2 className='transaltion-action-title'>Add Deposit</h2>
                <form className="transaction-form" onSubmit={submitForm}>
                    <label htmlFor="description" className='label'>Description</label>
                    <input
                        id="description"
                        className='input'
                        placeholder="Description"
                        type="text"
                        required />
                    <label htmlFor="amount" className='label'>Amount</label>
                    <input
                        id="amount"
                        min={0}
                        className='input'
                        placeholder="Amount"
                        type="number"
                        required />
                    <label htmlFor="category" className='label'>Category</label>
                    <select className='input' id="category" required>
                        {categories?.map((category, index) =>
                            <option key={index} value={category}>
                                {category}
                            </option>
                        )}
                    </select>
                    <div className='transations-actions'>
                        <button type="button" onClick={() => setIsAddingDeposit(false)}>Cancel</button>
                        <button type="submit" className='deposit'>Deposit</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Deposit;