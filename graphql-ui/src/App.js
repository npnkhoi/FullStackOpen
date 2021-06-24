import { Link, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Authors from './components/Authors';
import Books from './components/Books'
import AddBooks from './components/AddBooks';


const Header = () => {
  return (
    <div>
      <Link to='/'>
        <button> Authors </button>
      </Link>
      <Link to='/books'>
        <button> Books </button>
      </Link>
      <Link to='/add-books'>
        <button> Add books </button>
      </Link>
    </div>
  )
}

function App() {
  return (
    <Router>
      <h1>CS books</h1>
      <Header/>
      <Switch>
        <Route path='/books'>
          <Books />
        </Route>
        <Route path='/add-books'>
          <AddBooks />
        </Route>
        <Route path='/'>
          <Authors/>      
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
