import {Routes, Route} from 'react-router-dom'
import MapaComp from './Components/MapaComp';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MapaComp />}></Route>
        {/* <Route></Route> */}
      </Routes>
    </div>
  );
}

export default App;
