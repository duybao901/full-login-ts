import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {
    return (
        <div className="auth-page">
            <div className="register">
                <h2 className="auth-page__heading">Register</h2>
                <p className="auth-page__redirect">You have account?
                    <Link to='/login'> Login</Link>
                </p>
                <RegisterForm />
            </div>

        </div>
    )
}


export default Register
