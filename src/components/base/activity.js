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
            setActivityData(res.data);
        }).catch(err => setActivityData({status: 'error', errorObj: err.response.data}));
    }

    useEffect(()=>{
        loadData();
      
        setInterval(()=>{
            loadData();
        }, 120000);
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
