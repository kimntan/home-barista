import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AddBeanPage from './pages/AddBeanPage/AddBeanPage';
import BeanMethodsPage from './pages/BeanMethodsPage/BeanMethodsPage';
import RecipePage from './pages/RecipePage/RecipePage';
import './App.scss';
import AddBeanMethod from './pages/AddBeanMethod/AddBeanMethod';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';
import Landing from './pages/Landing/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Landing />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/add-bean" element={<AddBeanPage />} />
        <Route path="/:beanId" element={<BeanMethodsPage />} />
        <Route path="/:beanId/:recipeId" element={<RecipePage />} />
        <Route path="/:beanId/add-method" element={<AddBeanMethod />} />
        <Route path="/:beanId/add-recipe/:methodId" element={<AddRecipePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
