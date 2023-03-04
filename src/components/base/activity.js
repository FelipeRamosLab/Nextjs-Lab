import axios from 'axios';
import React, { useEffect, useContext } from "react";
import ServerError from "../contents/serverError";
import Spinner from '../loaders/spinner';
import PageDataContext from '../../context/pageData';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams }) {
    const {pageData, setPageData} = useContext(PageDataContext);

    function loadData(){
        const params = {...queryParams, ...window.queryParams};

        axios.post('/api/activities/' + activityUrl, params || {}).then(res=>{
            setPageData(prev => {
                delete prev.status;
                return {...prev, ...res.data}
            });
        }).catch(err=>setPageData({status: 'error', errorObj: err.response.data}));
    }
    
    useEffect(()=>{
        loadData();
      
        setInterval(()=>{
            loadData();
        }, 120000);
    }, []);

    if (pageData.status === 'error') {
        return (
            <PageLayout>
                <ServerError err={pageData} />
            </PageLayout>
        );
    }

    if (pageData.status === "loading") {
        return (
            <PageLayout>
                <div className="loading-page">
                    <Spinner />
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <PageContent pageData={pageData} setPageData={setPageData} loadData={loadData} queryParams={queryParams} />
        </PageLayout>
    );
}
