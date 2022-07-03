import axios from 'axios';
import React, { useState, useEffect } from "react";
import ServerError from "../components/contents/serverError";

export default function PageComponent({ PageLayout, PageContent, activityUrl, queryParams }) {
    const [pageData, setPageData] = useState({status: 'loading'});

    function loadData(){
        axios.post(activityUrl, queryParams || {}).then(res=>{
            setPageData(res.data);
        }).catch(err=>setPageData({status: 'error', errorObj: err.response.data}));
    }
    
    useEffect(()=>{
        loadData();
      
        setInterval(()=>{
            loadData();
        }, 5000);
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
                    <h1>Carregando...</h1>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout pageData={pageData}>
            <PageContent pageData={pageData} />
        </PageLayout>
    );
}
