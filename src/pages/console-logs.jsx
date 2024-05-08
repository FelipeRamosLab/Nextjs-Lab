import AJAX from '../utils/ajax';
import { useEffect } from 'react';

export default function ConsoleLog({ logsContent }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
      <pre>
          {logsContent}
      </pre>
  );
}

export async function getServerSideProps(context){
  const { query } = Object(context);
  const ajax = new AJAX('/api/read-logs');
  const logs = await ajax.get({ type: query?.type }, { isServer: true });

  try {  
    return {
      props: {
        queryParams: query,
        logsContent: logs.content
      }
    };
  } catch (err) {
    throw err;
  }
}
