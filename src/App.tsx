import { useCallback, useEffect, useState } from 'react';
import Login from './components/Login/Login';
import { ErrorResponse, User } from './types/api';
import { TransactionsProvider } from './context/context';
import Overview from './components/Overview/Overview';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

import './App.css';

function App() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = useCallback(async () => {
        if (!token) {
            return;
        }

        const res = await fetch('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = (await res.json()) as User | ErrorResponse;

        if (res.ok) {
            setUser(data as User);
        } else {
            const errorData = data as ErrorResponse;
            console.error('[Error] Loading User: ', errorData.message);
            setToken(null);
            setUser(null);
        }
    }, [token]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUser();
        }
    }, [fetchUser]);

    const startSession = (token: string, user: User) => {
        setToken(token);
        setUser(user);
    }

    const endSession = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    }

    return (
        <ErrorBoundary>
            <TransactionsProvider>
                {(!user || !token) && <Login startSession={startSession} />}
                {user && token && <Overview token={token} user={user} logout={endSession} />}
            </TransactionsProvider>
        </ErrorBoundary>
    )
}

export default App
