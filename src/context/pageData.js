import {createContext, useEffect, useState} from 'react';

const PageDataContext = createContext({});

export function PageDataProvider({children}) {
    const [pageData, setPageData] = useState({});

    useEffect(() => {
        ajax('/api/get-pagedata').post().then(response => {
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
