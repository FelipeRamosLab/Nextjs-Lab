import { useEffect } from 'react';
import MainHeader from "../headers/mainHeader";

export default function PageLayout({ children }) {
    return (<>
        <MainHeader></MainHeader>
        {children}
    </>);
}
