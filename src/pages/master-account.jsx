import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/pageLayout';
import ServerError from '../components/contents/serverError';
import MasterAccount from '../components/contents/master-account';

export default function MasterAccountPage({queryParams}) {
  const [pageData, setPageData] = useState({status: 'loading'});

  useEffect(()=>{
    axios.post('/api/activities/master-account', queryParams).then(res=>{
      setPageData(res.data)
    });
  }, []);

  console.log(pageData)

  if(pageData.hasError) {
    return (<PageLayout>
      <ServerError err={pageData} />
    </PageLayout>)
  }

  if(pageData.status === 'loading') {
    return (<PageLayout>
      <div className="loading-page">
        <h1>Carregando...</h1>
      </div>
    </PageLayout>)
  }

  return (
    <PageLayout pageData={pageData}>
      <MasterAccount pageData={pageData} />
    </PageLayout>
  );
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
