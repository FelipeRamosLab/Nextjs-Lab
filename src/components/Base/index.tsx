'use client';

import React from 'react';
import styles from '../../app/page.module.css';
import { Provider } from 'react-redux';
import store from "@/store";

type Props = {
   title: string;
   description: string;
   children?: React.ReactNode;
}

const Base: React.FC<Props> = ({ title, description, children }) => {
   return (
      <div className={styles.page}>
         <Provider store={store}>
            <main className={styles.main}>
               <h1>{title}</h1>
               <p>{description}</p>

               {children}
            </main>
         </Provider>
      </div>
   );
}

export default Base;
