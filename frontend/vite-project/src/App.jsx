import './App.css'
import Login from './components/Login';
import Nav_bar from './components/Nav_bar'
import Register from './components/Register'
import Logout from './components/Logout';
import Data from './components/Data';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detail from './components/Detail';
function App() {

  return (
    <>
      <BrowserRouter>
        <Nav_bar/>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='data' element={<Data/>}/>
          <Route path='logout' element={<Logout/>}/>
          <Route path='detail/:id' element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
