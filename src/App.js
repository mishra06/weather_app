import './App.css';

import { Routes,BrowserRouter,Route } from 'react-router-dom';
import Favourite from './components/Favourite';
import Dashboard from './screen/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/home' element={<Dashboard/>}/>
        <Route path='fav' element={<Favourite/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
