import MainHeader from "../headers/mainHeader";

export default function PageLayout({ pageData, children }) {
    return (<>
        <MainHeader pageData={pageData}></MainHeader>
        {children}
    </>);
}
