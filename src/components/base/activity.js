import axios from 'axios';
import React, { useEffect, useContext, useState } from "react";
import ServerError from "../contents/serverError";
import ActivityDataContext from '../../context/activityData';
import BackdropLoading from '../common/backdropLoading';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [loading, setLoading] = useState((!activityData || activityData.status === "loading"))

    function loadData(){
        const params = {...queryParams, ...window.queryParams};

        axios.post('/api/activities/' + activityUrl, params || {}).then(res=>{
            setActivityData(prev => {
                delete prev.status;
                return {...prev, ...res.data} 
            });
            setLoading(false);
        }).catch(err => setActivityData({status: 'error', errorObj: err.response.data}));
    }

    useEffect(()=>{
        loadData();
      
        setInterval(()=>{
            loadData();
        }, 120000);
    }, []);

    useEffect(() => {
        if (window) {
            const vercelTool = document.querySelector('vercel-live-feedback');
            
            sessionStorage.setItem('vercel-live-feedback-optout', '1');
            vercelTool && vercelTool.remove();
        }
    }, []);


    if (activityData.status === 'error') {
        return (
            <PageLayout>
                <ServerError err={activityData} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            {!loading && <PageContent loadData={loadData} queryParams={queryParams} />}

            <BackdropLoading open={loading} />
        </PageLayout>
    );
}
