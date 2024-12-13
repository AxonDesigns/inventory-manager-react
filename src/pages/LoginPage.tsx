import { useAuth } from "@/components/AuthProvider";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/administration");
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Card className="p-4 pt-6 w-full max-w-sm animate-fade-in-up bg-sidebar duration-200 ease-out-slow">
        <h1 className="text-xl font-bold text-center">
          Login
        </h1>
        <p className="text-sm text-foreground/50 text-center">
          <span>Request platform access </span>
          <Button variant="link" className="text-foreground font-semibold p-0" asChild>
            <a href="#">here</a>
          </Button>
        </p>
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage