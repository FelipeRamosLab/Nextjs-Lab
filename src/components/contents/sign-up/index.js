import SignUpForm from '../../forms/SignUpForm';

export default function SignUp() {
    return <div className="signpage-container container">
        <div className="form-card card">
            <h2 className="title">Sign-up new account</h2>
            
            <SignUpForm />
            <p>Ainda não tem uma conta? <a href="?formType=login">Fazer login</a></p>
        </div>
    </div>;
}
