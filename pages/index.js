import { useState } from 'react';
import Main from '../components/Main';
import GetInForm from '../components/GetInForm';
import ajax from '../utils/ajax';
import TopHeader from '../components/TopHeader';

const cookieAge = 3600000;

export default function Home() {
  const [ userLogged, setUserLogged ] = useState();

  async function register(userData) {
    try {
      const response = await ajax('https://localhost:8000/auth/register', userData).post();

      cookieStore.set({ name: 'token', value: response.token, expires: Date.now() + cookieAge });
      window.location.reload();
    } catch (error) {
      alert(error?.message || 'Unknown error!');
      console.error(error?.response?.data || error);
    }
  }

  async function login(userData) {
    try {
      const response = await ajax('https://localhost:8000/auth/login', userData).post();

      cookieStore.set({ name: 'token', value: response.token, expires: Date.now() + cookieAge });
      setUserLogged(response);
    } catch (err) {
      alert(err?.message || 'Unknown error!');
      console.error(err?.response?.data || err);
    }
  }

  async function sendChangePasswordEmail(user) {
    try {
      const response = await ajax('https://localhost:8000/auth/reset-password/send-email', { email: user?.email }).post();

      return response;
    } catch (err) {
      alert(err?.message || 'Unknown error!');
      console.error(err?.response?.data || err);
    }
  }

  return <>
    <TopHeader />

    <div className="container">
      <h1>Socket.io Chat</h1>

      {!userLogged && <GetInForm login={login} register={register} sendChangePasswordEmail={sendChangePasswordEmail} />}
      {userLogged && <Main user={userLogged} />}
    </div>
  </>
}
