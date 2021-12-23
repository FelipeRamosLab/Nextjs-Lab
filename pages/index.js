import axios from 'axios';

export default function Home({pageData, success}) {
  return <>
    <header>
      <h1>Bot Store</h1>
    </header>

    {success ? <section>
      <h2>Master accounts</h2>
      <p>Check below the master accounts currently active:</p>

      <div className="master-accounts">
        {pageData.map((acc, index)=>{
          return (<div key={acc.name+index} className="account">
            <h3>{acc.name}</h3>

            <table>
              <tbody>
                <tr>
                  <td><label>Counter: </label></td>
                  <td>{acc.count}</td>
                </tr>
                <tr>
                  <td><label>Type: </label></td>
                  <td>{acc.type}</td>
                </tr>
                <tr>
                  <td><label>Total balance: </label></td>
                  <td>{acc.totalBalance}</td>
                </tr>
              </tbody>
            </table>

            <h4>Bot accounts:</h4>
            {acc.botAccounts.map((bot, index)=>{
              return (<div key={bot.name + index} className="bot-account">
                <h5>{bot.name}</h5>
              </div>);
            })}
          </div>);
        })}
      </div>
    </section> : <h2>Error on load websocket!</h2>}
  </>
}

export async function getServerSideProps(){
  try {
    const pageData = await axios.get('https://feliperamos.uc.r.appspot.com/get-accounts')

    return {
      props: {
        success: true,
        pageData: pageData.data,
      }
    }
  } catch(err){
    return {
      props: {
        success: false
      }
    }
  }
}
