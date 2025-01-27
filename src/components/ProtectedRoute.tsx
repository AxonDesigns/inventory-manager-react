import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isAuthenticated, isLoading]);

    return (
        <div>
            {children}
        </div>
    );
}