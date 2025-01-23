import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const isAuthPage = location.pathname.startsWith('/auth');
   const isPlaygroundPage = location.pathname.startsWith('/playground');

   React.useEffect(() => {
       if (!user && !isAuthPage && isPlaygroundPage) {
           navigate('/auth', { 
               state: { from: location.pathname }
           });
       }
   }, [user, navigate, location.pathname, isAuthPage, isPlaygroundPage]);

   if (!user && !isAuthPage && isPlaygroundPage) {
       return null;
   }

   if (user && isAuthPage) {
       navigate('/');
       return null;
   }

   return <>{children}</>;
};