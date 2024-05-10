import { useEffect } from 'react';
import MainHeader from "../headers/mainHeader";

export default function PageLayout({ children, pageData }) {
    useEffect(() => {
        cookieStore.get('userEmail').then(cookie => {
            if (!cookie && window.location.pathname !== '/') {
                cookieStore.delete('token');
                cookieStore.delete('userEmail');
                window.location.href = '/';
            }

            if (cookie && window.location.pathname === '/') {
                window.location.href = '/dashboard';
            }
        }).catch(err => {
            alert(err);
        });
    }, []);

    return (<>
        <MainHeader pageData={pageData}></MainHeader>
        {children}
    </>);
}
