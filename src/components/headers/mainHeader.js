import {useContext} from 'react';
import Link from 'next/link';
import Image from 'next/image'
import Badge from '@mui/material/Badge';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import IconButton from '@mui/material/IconButton';
import PageDataContext from '../../context/pageData';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function MainHeader(){
    const {pageData} = useContext(PageDataContext);

    return (
        <header>
            <div className="container header-wrap">
                <Link href="/" passHref>
                    <div className="header-column logo-wrap" onClick={() => console.log('dfsfd')}>
                            <Image
                                src="/images/logo.svg"
                                alt="logo"
                                width="100%"
                                height="100%"
                            />
                    </div>
                </Link>
                <div className="header-column menu-wrap">
                    <Link href="/logs" passHref>
                        <IconButton className="icon-button">
                            <Badge badgeContent={pageData?.logsCount || 0} color="error">
                                <LogoDevIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                    <IconButton className="icon-button">
                        <AccountCircleIcon />
                    </IconButton>
                </div>
            </div>
        </header>
    );
}
