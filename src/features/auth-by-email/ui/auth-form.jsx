import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { sendLogin } from '../model/sign-in-by-email.js'
import { useSession } from '@/entities/session'
import './auth-form.css'


export function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const { setUser, isAuthenticated } = useSession()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const userData = await sendLogin(email, password);
          setUser(userData);
        } catch (err) {
          console.error(err);
        }
    }

    return (
        <form className='login__form' onSubmit={handleSubmit}>
            <h1>Sign In To Account</h1>
            <div className="form__inputs">
                <input 
                    type="email" 
                    className="form__input form__email" 
                    placeholder="i_ivanov@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    className="form__input form__password" 
                    placeholder="your_password123"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <a href="#">create an account</a>
            <a href="#">forgot password</a>
            <button type='submit'>Войти</button>
        </form>
    )
}