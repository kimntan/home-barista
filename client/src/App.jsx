import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddBeanPage from './pages/AddBeanPage/AddBeanPage';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-bean" element={<AddBeanPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
