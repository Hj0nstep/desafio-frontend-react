
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 

import './css/global.css';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Home />
      <Footer />
    </BrowserRouter>
  </StrictMode>
);