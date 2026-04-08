import { useLogin } from '../UseLogin';
import './LoginForm.css'
import '../LoginPage/LoginPage.css'

const LoginForm = () => {
    const { email, setEmail, password, setPassword, handleSubmit } = useLogin();

    return (
        <form className='login-form' onSubmit={handleSubmit}>
            <div className="form-group">
                <h3>Adresse email</h3>
                <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <h3>Mot de passe</h3>
                <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Se connecter</button>
        </form>
    )
}

export default LoginForm