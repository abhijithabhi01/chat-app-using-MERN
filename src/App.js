import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './components/auth/Authentication';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<LandingPage/>}/>
      <Route path='/Authentication' element={<Authentication/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
