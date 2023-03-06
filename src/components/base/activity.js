import axios from 'axios';
import React, { useEffect, useContext } from "react";
import ServerError from "../contents/serverError";
import Spinner from '../loaders/spinner';
import ActivityDataContext from '../../context/activityData';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);

    function loadData(){
        const params = {...queryParams, ...window.queryParams};

        axios.post('/api/activities/' + activityUrl, params || {}).then(res=>{
            setActivityData(prev => {
                delete prev.status;
                return {...prev, ...res.data} 
            });
        }).catch(err => setActivityData({status: 'error', errorObj: err.response.data}));
    }

    useEffect(()=>{
        loadData();
      
        setInterval(()=>{
            loadData();
        }, 120000);
    }, []);

    useEffect(() => {
        if (!window?.sessionStorage.getItem('vercel-live-feedback-optout')) {
            document.querySelector('vercel-live-feedback').remove();
            sessionStorage.setItem('vercel-live-feedback-optout', '1');
            console.log('>> "vercel-live-feedback-optout" removed!')
        }
    }, []);


    if (activityData.status === 'error') {
        return (
            <PageLayout>
                <ServerError err={activityData} />
            </PageLayout>
        );
    }

    if (!activityData || activityData.status === "loading") {
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
            <PageContent loadData={loadData} queryParams={queryParams} />
        </PageLayout>
    );
}
