import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ListUsers from './pages/ListUsers';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListUsers />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={5000} newestOnTop />
      </BrowserRouter>
    </>
  );
}

export default App;
