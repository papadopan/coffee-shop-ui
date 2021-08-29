import logo from './logo.svg';
import './App.css';
import { gql , useQuery} from '@apollo/client';

const query = gql`
  query FetchAllTheWaiters {
    waiters {
      id
      name
    }
  }
`

function App() {

  const { loading, error, data} = useQuery(query)
  if (loading) {
    return    <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
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
            ? data.waiters.map(waiter =><div>{waiter.name} -{waiter.id}</div>)
            : <p>No waiters yet</p>
        }
      </header>
    </div>
  );
}

export default App;
