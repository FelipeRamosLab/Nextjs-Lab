import axios from "axios";
import React, { useState, useEffect } from 'react';
import config from '../../../config.json';
import PageLayout from "../../components/pageLayout";

const root = config[config.root];

export default function Home({}) {
  const [pageData, setPageData] = useState({status: 'loading'});

  useEffect(()=>{
    axios.get('/api/activities/home').then(res=>{
      setPageData(res.data)
    });
  }, []);

  if(pageData.hasError) {
    return (<PageLayout>
      <div className="error-page">
        <h1>500 - Ocorreu um erro no servidor</h1>
      </div>
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
      <div className="container">
        
      </div>
    </PageLayout>
  );
}

