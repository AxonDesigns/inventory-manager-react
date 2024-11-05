import { useAuth } from "@/components/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { Card } from "@/components/ui/card"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tables");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Card className="p-4 w-full max-w-sm animate-fade-in-up duration-200 ease-out-slow">
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage