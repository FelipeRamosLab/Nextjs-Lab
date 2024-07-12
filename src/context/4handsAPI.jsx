import { createContext, useRef, useEffect } from 'react';
import _4HandsAPI from '4hands-api/client';
import configs from '../../config.json';

const APIContext = createContext();

export function APIProvider({ children }) {
   const instance = useRef();

   useEffect(() => {
      if (!instance.current) {
         instance.current = new _4HandsAPI({
            apiHost: configs.apiHost,
            useSubscription: true,
            ajaxConfig: {
               rejectUnauthorized: false
            }
         });
      }
   }, []);

   return <APIContext.Provider value={() => instance.current}>
      {children}
   </APIContext.Provider>
}

export default APIContext;

