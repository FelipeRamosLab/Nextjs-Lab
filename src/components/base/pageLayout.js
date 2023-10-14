import { useEffect } from 'react';
import MainHeader from "../headers/mainHeader";

export default function PageLayout({ children, pageData }) {
    return (<>
        <MainHeader pageData={pageData}></MainHeader>
        {children}
    </>);
}
