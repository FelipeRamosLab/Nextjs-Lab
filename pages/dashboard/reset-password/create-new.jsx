import GetInForm from '../../../components/GetInForm';
import ajax from '../../../utils/ajax';

export default function CreateNewPassword({ useremail, resettoken }) {
   async function createNewPassword(user) {
      try {
         const response = await ajax('https://localhost:8000/auth/reset-password/create-new', {
            useremail,
            resettoken,
            newPassword: user.password,
            confirmPassword: user.confirmPassword
         }).put();
   
         return response;
       } catch (err) { 
         alert(err?.message || 'Unknown error!');
         console.error(err?.response?.data || err);
       }
   }

   return <div className="container">
      <h1>Change Password</h1>
      
      <GetInForm initType="new-password" useremail={useremail} resettoken={resettoken} createNewPassword={createNewPassword} />
   </div>;
}

export async function getServerSideProps({ query }) {
   return {
      props: query
   }
}
