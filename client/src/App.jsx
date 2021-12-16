import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { CarPage } from "./pages/CarPage";
import { CreateRentalPage } from "./pages/CreateRentalPage";
import { DetailRentalPage } from "./pages/DetailRentalPage";
import { UserRental } from "./pages/UserRental";
import { PrivateRoute } from "./routes";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashBoard } from "./pages/admin/AdminDashBoard";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/car"
          element={
            <PrivateRoute>
              <CarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/rental/:carId"
          element={
            <PrivateRoute>
              <CreateRentalPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/detail/:rentalId"
          element={
            <PrivateRoute>
              <DetailRentalPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user_rental/:userId"
          element={
            <PrivateRoute>
              <UserRental />
            </PrivateRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};
