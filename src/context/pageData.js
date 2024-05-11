import {createContext, useEffect, useState} from 'react';
import AJAX from '../utils/ajax';

const PageDataContext = createContext({});

export function PageDataProvider({children}) {
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        cookieStore.get('userEmail').then(cookie => {
            if (!cookie) return;

            new AJAX('/pages/base-data').get().then(response => {
                setPageData({
                    notificationsCount: response.notificationsCount,
                    user: response.user
                });
            }).catch(err => {
                return err;
            });
        })
    }, []);

    return <PageDataContext.Provider
        value={{
            pageData,
            setPageData
        }}
    >
        {children}
    </PageDataContext.Provider>
}

export default PageDataContext;
