import './auth-form.css'


export function AuthForm() {
    return (
        <form className='login__form'>
            <h1>Sign In To Account</h1>
            <div className="form__inputs">
                <input type="email" className="form__input form__email" placeholder="iivanov@gmail.com"/>
                <input type="password" className="form__input form__password" placeholder="your_password123"/>
            </div>
            <a href="#">already have an account</a>
            <a href="#">forgot password</a>
            <button>Войти</button>
        </form>
    )
}