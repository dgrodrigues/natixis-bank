import { useState, FormEvent, useContext } from 'react';
import Modal from '../Modal/Modal';
import { TransactionsContext } from '../../context/context';

import './Withdraw.styles.css';

export interface WithdrawProps {
    categories?: string[];
}

const Withdraw = ({ categories }: WithdrawProps) => {
    const [isAddingWithdraw, setIsAddingWithdraw] = useState(false);
    const { dispatch, state } = useContext(TransactionsContext);

    const submitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        dispatch({
            type: 'WITHDRAW', payload: {
                id: Date.now(), // Use timestamp as id since we are using mock data
                type: "Withdrawal",
                amount: parseFloat(form.amount.value),
                currency: "€",
                date: new Date().toJSON(),
                description: form.description.value,
                balance: state.balance - parseFloat(form.amount.value),
                category: form.category.value,
                moneyFlow: "out"
            }
        });
        setIsAddingWithdraw(false);
    }

    return (
        <>
            <button
                className='widthdraw'
                onClick={() => setIsAddingWithdraw(true)}>Widthdraw</button>
            <Modal isOpen={isAddingWithdraw} onClose={() => setIsAddingWithdraw(false)}>
                <h2 className='transaltion-action-title'>Add Withdrawal</h2>
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
                        <button type="button" onClick={() => setIsAddingWithdraw(false)}>Cancel</button>
                        <button type="submit" className='widthdraw'>Withdraw</button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default Withdraw;