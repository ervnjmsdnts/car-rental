import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const authed = localStorage.getItem("isAuthed");

  return authed ? children : <Navigate to="/login" />;
};
