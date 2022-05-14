import axios from "axios";
import React, { useState, useEffect } from 'react';
import PageLayout from "../components/pageLayout";
import ServerError from "../components/contents/serverError";
import HomePage from "../components/contents/home";

export default function Home({}) {
  const [pageData, setPageData] = useState({status: 'loading'});

  useEffect(()=>{
    axios.get('/api/activities/home').then(res=>{
      setPageData(res.data)
    });
  }, []);

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
      <HomePage pageData={pageData} />
    </PageLayout>
  );
}

