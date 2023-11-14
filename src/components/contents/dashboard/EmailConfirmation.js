import { useEffect } from 'react';
import AJAX from '../../../utils/ajax';

export default function EmailConfirmation({ queryParams }) {
    const { confirmationtoken } = Object(queryParams);
    
    useEffect(() => {
        const requestInstance = new AJAX('/auth/confirm-email');

        requestInstance.post({ confirmationtoken }).then(verified => {
            if (verified.success) {
                window.location.href = '/';
            }
        }).catch(err => {
            console.error(err);
        });
    }, [confirmationtoken]);

    return (
        <div className="email-confirmation container">
            <div className="content">
                <h2 className="title">Confirming your e-mail...</h2>
            </div>
        </div>
    );
}
