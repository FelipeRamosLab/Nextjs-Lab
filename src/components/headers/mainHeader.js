import Link from 'next/link';
import Image from 'next/image'
import Badge from '@mui/material/Badge';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import IconButton from '@mui/material/IconButton';
import AccountMenu from '../menus/AccountMenu';

export default function MainHeader({ pageData }){
    const { user } = Object(pageData);

    return (
        <header>
            <div className="container header-wrap">
                <Link href="/" passHref>
                    <div className="header-column logo-wrap">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width="100%"
                            height="100%"
                        />
                    </div>
                </Link>

                <h3 className="brand-name">BotStore</h3>

                <div className="header-column menu-wrap">
                    {user ? <AccountMenu pageData={pageData} /> : <></>}
                </div>
            </div>
        </header>
    );
}
