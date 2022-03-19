import './App.css'
import AddList from './components/AddList';
import GetList from './components/GetList';
import Headers from './components/Headers'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        <AddList />
        <GetList />
      </div>
    </Router>
 );
}

export default App;

