import axios from 'axios';
import React, { useState, useEffect } from "react";
import ServerError from "../contents/serverError";
import Spinner from '../loaders/spinner';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams }) {
    const [pageData, setPageData] = useState({status: 'loading'});

    function loadData(){
        const params = {...queryParams, ...window.queryParams};

        axios.post('/api/activities/' + activityUrl, params || {}).then(res=>{
            setPageData(res.data);
        }).catch(err=>setPageData({status: 'error', errorObj: err.response.data}));
    }
    
    useEffect(()=>{
        loadData();
      
        // setInterval(()=>{
        //     loadData();
        // }, 3000);
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
        <PageLayout pageData={pageData}>
            <PageContent pageData={pageData} setPageData={setPageData} loadData={loadData} />
        </PageLayout>
    );
}
