import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import ContactForm from './components/Contacts/ContactForm';
import NotFound from './pages/NotFound';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';

function App() {
  return (
    <>
      <marquee behavior="alternate" scrollamount="10" style="color: red; font-weight: bold; font-size: 18px;">Request, Response may take 20 to 30s. It is hosted on the free version of Render.</marquee>

      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/contacts/new" element={<PrivateRoute><ContactForm /></PrivateRoute>} />
              <Route path="/contacts/:id/edit" element={<PrivateRoute><ContactForm /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;