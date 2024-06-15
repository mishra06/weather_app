import './App.css';

import { Routes,BrowserRouter,Route } from 'react-router-dom';
import Favrouts from './components/Favrouts';
import Dashboard from './screen/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/home' element={<Dashboard/>}/>
        <Route path='fav' element={<Favrouts/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
