import axios from '../../../axios-call';
import React, { useEffect, useContext, useState } from "react";
import ServerError from "../contents/serverError";
import ActivityDataContext from '../../context/activityData';
import BackdropLoading from '../common/backdropLoading';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [loading, setLoading] = useState((!activityData || activityData.status === "loading"));

    async function loadData(){
        const params = {...queryParams, ...window.queryParams};
        const sessionID = await cookieStore.get('sessionID');

        try {
            const res = await axios.post('http://localhost:80/pages/' + activityUrl, {}, { headers: {
                token: sessionID ? sessionID.value : ''
            }});

            setActivityData(res.data);
        } catch (err) {
            setActivityData({status: 'error', errorObj: err.response.data});

            if (err.errorObj.code === 401) {
                console.log(err)
            }
        } finally {
            return setLoading(false);
        }
    }

    useEffect(()=>{
        if (activityUrl) {
            loadData();
        } else {
            setActivityData(prev => {
                delete prev.status;
                return prev;
            });
            setLoading(false);
        }
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
        <PageLayout pageData={activityData}>
            {!loading && <PageContent loadData={loadData} pageData={activityData} queryParams={queryParams} />}

            <BackdropLoading open={loading} />
        </PageLayout>
    );
}
