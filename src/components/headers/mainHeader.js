import Link from 'next/link';
import Image from 'next/image'
import AccountMenu from '../menus/AccountMenu';
import NotificationsDropDown from '../menus/NotificationsDropDown';
import pageDataContext from '../../context/pageData';
import { useContext } from 'react';

export default function MainHeader({ pageData }){
    const { user } = Object(pageData);
    const pageDataBase = useContext(pageDataContext);

    return (
        <header>
            <div className="container header-wrap">
                <Link href="/" passHref>
                    <div className="header-column logo-wrap">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width="50"
                            height="50"
                        />
                    </div>
                </Link>

                <h3 className="brand-name">BotStore</h3>

                <div className="header-column menu-wrap">
                    <NotificationsDropDown pageData={pageDataBase?.pageData} />
                    {user ? <AccountMenu pageData={pageData} /> : <></>}
                </div>
            </div>
        </header>
    );
}
