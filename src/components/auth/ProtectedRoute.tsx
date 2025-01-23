import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const isAuthPage = location.pathname.startsWith('/auth');
   const isHomePage = location.pathname === '/';

   React.useEffect(() => {
       if (!user && !isAuthPage && !isHomePage) {
           navigate('/auth', { 
               state: { from: location.pathname }
           });
       }
   }, [user, navigate, location.pathname, isAuthPage, isHomePage]);

   if (!user && !isAuthPage && !isHomePage) {
       return null;
   }

   if (user && isAuthPage) {
       navigate('/');
       return null;
   }

   return <>{children}</>;
};