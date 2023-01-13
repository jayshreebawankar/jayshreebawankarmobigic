import './App.css';
import Router from './router/route.js';

function App() {
  return (
    <div className="App">
      <div className="blur" style={{top:'18%', right : '0'}}> </div>
      <div className="blur" style={{top:'36%', left: '-8 rem'}}> </div>
      <Router/>
    </div>
  );
}

export default App;
