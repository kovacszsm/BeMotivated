import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/Home/Home';
import {Login} from './pages/Login/Login';
import {Registration} from './pages/Registration/Registration';

export const App =() => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}