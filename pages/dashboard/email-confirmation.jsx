import { useEffect } from 'react';
import AJAX from '../../utils/AJAXInstance';

export default function EmailConfirmationPage({ queryParams }) {
   const { confirmationtoken } = Object(queryParams);

   useEffect(() => {
      const requestInstance = new AJAX('/auth/confirm-email', 'https://localhost:8000');

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
         <div className="card getin-form">
            <h2 className="title">Confirming your e-mail...</h2>
         </div>
      </div>
   );
}

export async function getServerSideProps(context) {
   return {
      props: { queryParams: context.query }
   }
}