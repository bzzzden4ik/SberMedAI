import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { sendLogin, sendRegister } from '../model/sign-in-by-email.js'
import { useSession } from '@/entities/session'
import './auth-form.css'


export function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    const [isLogin, setIsLogin] = useState(true)

    const navigate = useNavigate()
    const { setUser, isAuthenticated } = useSession()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmitLogin = async (e) => {
        e.preventDefault()
        try {
          const userData = await sendLogin(email, password);
          localStorage.setItem('token', userData.access_token)
          const response = await api.get('/auth/me', {
            headers: {
              'Authorization': `Bearer ${userData.access_token}`,
              'ngrok-skip-browser-warning': "true"
            }
          });
          setUser(response.data)
        } catch (err) {
          console.error(err);
        }
    }
    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
          const userData = await sendRegister(email, password, userName, "patient");
          setUser(userData);
        } catch (err) {
          console.error(err);
        }
    }
    if (isLogin) return (
        <form className='login__form' onSubmit={handleSubmitLogin}>
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
            <a onClick={() => {
                setIsLogin(false)
            }}>create an account</a>
            <a href="#">forgot password</a>
            <button type='submit'>Войти</button>
        </form>
    )
    return (
        <form className='login__form' onSubmit={handleSubmitRegister}>
            <h1>Create an Account</h1>
            <div className="form__inputs">
                <input 
                    type="email" 
                    className="form__input form__email" 
                    placeholder="i_ivanov@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="text" 
                    className="form__input form__name" 
                    placeholder="Ivanov Ivan"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <input 
                    type="password" 
                    className="form__input form__password" 
                    placeholder="your_password123"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <a onClick={() => {
                setIsLogin(true)
            }}>sign in to account</a>
            <a href="#">forgot password</a>
            <button type='submit'>Зарегистрировать</button>
        </form>
    )
}