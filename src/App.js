import logo from './logo.svg';
import './App.css';
import { gql , useQuery, NetworkStatus } from '@apollo/client';
import AddWaiter from './AddWaiter';


const query = gql`
  fragment PersonalData on Waiter {
    name,
    last
}
  query FetchAllTheWaiters {
    waiters {
      ...PersonalData
      id
    }
  }
`



function App() {

  const { loading, error, data , refetch, networkStatus} = useQuery(query, {
    notifyOnNetworkStatusChange:true,
  })

  if (loading) {
    return    <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                </header>
              </div>
  }
  if (networkStatus == NetworkStatus.refetch) {
    return    <div className="App">
                <header className="App-header">
                  refetching....
                </header>
              </div>
  }

  if (error) {
    return    <div className="App">
                <header className="App-header">
                  <p>there is an error </p>
                </header>
              </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          data.waiters.length > 0
            ? data.waiters.map(waiter =><div key={waiter.id}>{waiter.last}-{waiter.name} -  {waiter.id}</div>)
            : <p>No waiters yet</p>
        }
      <button onClick={()=> refetch()}>
        Fetch some more
      </button>
      <AddWaiter/>
      </header>
    </div>
  );
}

export default App;
