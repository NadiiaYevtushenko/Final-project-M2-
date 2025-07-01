import { Routes, Route } from 'react-router-dom'; 
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeProvider from '../app/ThemeProvider';
import { AuthProvider } from '../app/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper/Wrapper';
import '../app//styles/globals.css';

import HomePage from '../pages/home/Home';
import ErrorPage from '../app/error';
import ContactPage from '../pages/contact/Contacts';
import ShopPage from '../pages/shop/pages/Shop';
import ServicesPage from '../pages/services/Services';
import ProductsPage from '../pages/shop/pages/ProductsPage'; 
import AdminPage from '../pages/admin/AdminPage'; 

import Profile from '../pages/profile/Profile'; 
import ProtectedRoute from '../app/ProtectedRoute';

config.autoAddCss = false;

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Header />
        <main>
          <Wrapper>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductsPage />} />

              {/* ✅ Захищені маршрути */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Fallback для невідомих маршрутів */}
              <Route path="*" element={<HomePage />} errorElement={<ErrorPage />} />
            </Routes>
            <ToastContainer />
          </Wrapper>
        </main>
        <Footer />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;