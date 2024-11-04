import LoginForm from "@/components/LoginForm";
import { Card } from "@/components/ui/card"


function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Card className="p-4 w-full max-w-sm animate-fade-in-up duration-200 ease-out-slow">
        <LoginForm />
      </Card>
    </div>
  )
}

export default LoginPage