import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/pageLayout';
import ServerError from '../components/contents/serverError';
import MasterAccount from '../components/contents/master-account';

export default function MasterAccountPage({queryParams}) {
  const [pageData, setPageData] = useState({status: 'loading'});

  function loadData(){
    axios.post('/api/activities/master-account', queryParams).then(res=>{
      setPageData(res.data);
    }).catch(err=>setPageData({status: 'error', errorObj: err}));
  }

  useEffect(()=>{
    loadData();
  
    // setInterval(()=>{
    //   loadData();
    // }, 5000);
  }, []);

  if(pageData.hasError || pageData.status === 'error') {
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
      <MasterAccount pageData={pageData} setPageData={setPageData}/>
    </PageLayout>
  );
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
