import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.css';
import Main from './components/MainComponents';
import { FirebaseApplication } from './Firebase/firebaseconfig.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
