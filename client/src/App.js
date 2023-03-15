import React from 'react';
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Register from "./pages/Register";
import Login from './pages/Login';
import Chat from "./pages/Chat";
import Test from "./pages/Test";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path ="/register" element ={<Register />}/>
        <Route path ="/login" element ={<Login />}/>
        <Route path ="/" element ={<Chat />}/>
        <Route path ="/test" element={<Test />}/>
      </Routes>
    </BrowserRouter>
  )
}