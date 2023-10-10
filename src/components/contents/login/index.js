import LoginForm from '../../forms/LoginForm';

export default function Login() {
    return <div className="signpage-container container">
        <div className="form-card card">
            <h2 className="title">Entrar na conta</h2>
            
            <LoginForm />
        </div>
    </div>;
}
