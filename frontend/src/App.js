import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Revenue from './components/Revenue';
import Costs from './components/Costs';
import Funnels from './components/Funnels';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/funnels" element={<Funnels />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;