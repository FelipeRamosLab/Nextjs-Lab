import AJAX from '../../utils/ajax';
import React, { useEffect, useContext, useState } from 'react';
import ServerError from '../contents/serverError';
import ActivityDataContext from '../../context/activityData';
import BackdropLoading from '../common/backdropLoading';

export default function Activity({ PageLayout, PageContent, activityUrl, queryParams, pageID }) {
    const {activityData, setActivityData} = useContext(ActivityDataContext);
    const [loading, setLoading] = useState((!activityData || activityData.status === 'loading'));

    async function loadData(){
        const params = {...queryParams, ...window.queryParams};

        try {
            const res = await new AJAX('/pages/' + activityUrl).post(params);
            setActivityData(res);
        } catch (err) {
            if (err.name === 'USER_EMAIL_NOT_CONFIRMED' || err.code === 401) {
                const userEmail = await window.cookieStore.get('userEmail');
                const url = new URL(window.location.origin + '/dashboard/confirmation-sent');

                url.searchParams.set('userEmail', userEmail.value);
                window.location.href = url.toString();
                return setActivityData({ status: 'error', code: 401, ...err });
            }

            setActivityData({ status: 'error', code: 500, name: 'Server Error', message: 'The server got an error!' });
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
                <ServerError
                    code={activityData.code}
                    name={activityData.name}
                    message={activityData.message}
                />
            </PageLayout>
        );
    }

    return (
        <PageLayout pageData={activityData}>
            {!loading && <PageContent
                loadData={loadData}
                pageData={activityData}
                queryParams={queryParams}
                pageID={pageID}
            />}

            <BackdropLoading open={loading} />
        </PageLayout>
    );
}
