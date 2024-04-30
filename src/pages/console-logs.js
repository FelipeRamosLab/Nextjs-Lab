import AJAX from '../utils/ajax';

export default function ConsoleLog({ logsContent }) {
  debugger;
  return (
      <div>
          
      </div>
  );
}

export async function getServerSideProps(context){
  try {
    const ajax = new AJAX('/api/read-logs');
    const logs = await ajax.get();
    console.log(logs);
  
    return {
      props: {
        queryParams: context.query,
        // logsContent: logs
      }
    };
  } catch (err) {
    throw err;
  }
}
