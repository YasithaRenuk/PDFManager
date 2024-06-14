import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';

import Register from "./pages/Register";
import Login from "./pages/Login";
import DashBord from "./pages/DashBord";
import NotFound from "./components/NotFound"; 

import AllPDFS from "./components/AllPDF"

axios.defaults.baseURL = 'http://localhost:8070'; 
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <UserContextProvider>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<DashBord />}>
            <Route path='allPDFs' element={<AllPDFS/>}/>
          </Route>

        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
