import { BrowserRouter } from 'react-router-dom';
import './assets/css/index.css';
import Header from './components/Header';
import Main from './components/MainComponents';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
