import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/pageLayout';
import PageComponent from '../components/pageComponent';
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
  
    setInterval(()=>{
      loadData();
    }, 5000);
  }, []);

  return <PageComponent
    PageLayout={PageLayout}
    PageContent={MasterAccount}
    pageData={pageData}
  />
}

export async function getServerSideProps(context){
  return {
    props: { queryParams: context.query}
  }
}
