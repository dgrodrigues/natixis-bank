import { useState } from 'react'
import type { User, LoginResponse, ErrorResponse } from '../../types/api';
import './Login.styles.css';

export interface LoginProps {
    startSession: (token: string, user: User) => void;
}

const Login = ({ startSession }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = (await res.json()) as LoginResponse | ErrorResponse

        if (res.ok) {
            const loginData = data as LoginResponse
            localStorage.setItem('token', loginData.token)
            startSession(loginData.token, loginData.user);
        } else {
            const errorData = data as ErrorResponse
            setError(errorData.message)
        }
    }

    return (
        <div className='login-container'>
            <div className='login-form-panel'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input
                        className='input'
                        placeholder="Username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)} />
                    <input
                        type="password"
                        className='input'
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    <p>For mock usage there's 3 usernames available: user01, user02 and user03. All with pwd 1234.</p>
                </form>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    )
}

export default Login;