import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import EmergencyFAB from './components/EmergencyFAB';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import AddPet from './pages/AddPet';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Vets from './pages/Vets';
import Adoption from './pages/Adoption';
import Admin from './pages/Admin';
import AdminPets from './pages/AdminPets';
import AdminFood from './pages/AdminFood';
import AdminOrders from './pages/AdminOrders';
import AdminAppointments from './pages/AdminAppointments';
import MyListings from './pages/MyListings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
      <Router>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '16px',
            },
          }}
        />
        <EmergencyFAB />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="marketplace/add" element={<AddPet />} />
            <Route path="store" element={<Store />} />
            <Route path="cart" element={<Cart />} />
            <Route path="vets" element={<Vets />} />
            <Route path="adoption" element={<Adoption />} />
            <Route path="my-listings" element={<MyListings />} />
            
            {/* Admin Routes Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<Admin />} />
              <Route path="admin/pets" element={<AdminPets />} />
              <Route path="admin/food" element={<AdminFood />} />
              <Route path="admin/orders" element={<AdminOrders />} />
              <Route path="admin/appointments" element={<AdminAppointments />} />
            </Route>
            
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
