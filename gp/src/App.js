import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';
import InputMealPage from './pages/InputMealPage';
import RecipePage from './pages/RecipePage';
import IngredientPage from './pages/IngredientPage';
import ShoppingListPage from './pages/ShoppingListPage';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/input-meal" element={<InputMealPage />} />
        <Route path="/recipe" element={<RecipePage />} />
        <Route path="/ingredient" element={<IngredientPage />} />
        <Route path="/shopping-list" element={<ShoppingListPage />} />
      </Routes>
    </Router>
  );
}

export default App;