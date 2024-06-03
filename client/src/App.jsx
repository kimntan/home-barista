import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddBeanPage from './pages/AddBeanPage/AddBeanPage';
import BeanMethodsPage from './pages/BeanMethodsPage/BeanMethodsPage';
import RecipePage from './pages/RecipePage/RecipePage';
import './App.scss';
import AddBeanMethod from './pages/AddBeanMethod/AddBeanMethod';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-bean" element={<AddBeanPage />} />
        <Route path="/:beanId" element={<BeanMethodsPage />} />
        <Route path="/:beanId/:recipeId" element={<RecipePage />} />
        <Route path="/:beanId/add-method" element={<AddBeanMethod />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
