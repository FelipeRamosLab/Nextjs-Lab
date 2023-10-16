import {createContext, useEffect, useState} from 'react';
import AJAX from '../utils/ajax';

const PageDataContext = createContext({});

export function PageDataProvider({children}) {
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        new AJAX('/pages/base-data').get().then(response => {
            setPageData({
                logsCount: response.logsCount,
                user: response.user
            });
        }).catch(err => {
            throw err;
        });
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
