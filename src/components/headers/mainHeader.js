import {useContext} from 'react';
import Link from 'next/link';
import Badge from '@mui/material/Badge';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import IconButton from '@mui/material/IconButton';
import PageDataContext from '../../context/pageData';

export default function MainHeader(){
    const {pageData} = useContext(PageDataContext);

    return (
        <header>
            <div className="container header-wrap">
                <div className="header-column logo-wrap">
                </div>
                <div className="header-column menu-wrap">
                    <Link href="/logs" passHref>
                        <IconButton className="icon-button">
                            <Badge badgeContent={pageData?.logsCount || 0} color="error">
                                <LogoDevIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </div>
            </div>
        </header>
    );
}
