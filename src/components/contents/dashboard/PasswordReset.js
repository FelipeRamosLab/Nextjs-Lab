import ForgotPasswordForm from "../../forms/ForgotPassword";
import CreateNewPassword from "../../forms/CreateNewPassword";

export default function PasswordReset({ queryParams }) {
    const { isCreateNew, resettoken, useremail } = Object(queryParams);

    return (
        <div className="password-reset container">
            <div className="card form-card">
                {!isCreateNew ? <ForgotPasswordForm /> : <CreateNewPassword resettoken={resettoken} useremail={useremail} />}
            </div>
        </div>
    );
}
