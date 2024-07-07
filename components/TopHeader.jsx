import { Button } from '@mui/material';
import AJAX from '../utils/AJAXInstance';

export default function TopHeader() {
   async function signOut() {
      const res = await new AJAX('/auth/signout', 'https://localhost:8000').post();

      if (res?.success) {
         cookieStore.delete('token');
         location.reload();
      }
   }

   return <div className="top-header">
      <Button onClick={signOut}>Sign Out</Button>
   </div>;
}
