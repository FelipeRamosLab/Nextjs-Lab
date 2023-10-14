import LoginForm from '../../forms/LoginForm';

export default function Login() {
    return <div className="signpage-container container">
        <div className="form-card card">
            <h2 className="title">Entrar na conta</h2>
            
            <LoginForm />
            <p>Ainda não tem uma conta? <a href="?formType=sign-up">Criar conta</a></p>
        </div>
    </div>;
}
