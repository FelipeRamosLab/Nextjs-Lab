import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageComponent from '../components/pageComponent';
import PageLayout from '../components/pageLayout';
import HomePage from '../components/contents/home';

export default function Index() {
  const [pageData, setPageData] = useState({status: 'loading'});

  useEffect(()=>{
    axios.get('/api/activities/home').then(res=>{
      setPageData(res.data)
    });
  }, []);

  return <PageComponent
    PageLayout={PageLayout}
    PageContent={HomePage}
    pageData={pageData}
  />
}
