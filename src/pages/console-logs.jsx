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
  const ajax = new AJAX('/api/read-logs');
  const logs = await ajax.get({}, { isServer: true });

  try {  
    return {
      props: {
        queryParams: context.query,
        logsContent: logs.content
      }
    };
  } catch (err) {
    throw err;
  }
}
