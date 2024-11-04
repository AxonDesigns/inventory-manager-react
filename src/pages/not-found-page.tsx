import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <div className="flex flex-col items-center animate-fade-in-up ease-out">
        <h1 className="text-9xl font-bold">404</h1>
        <p><span className="text-lg font-bold">Ops!</span> We couldn't find what you're looking for.</p>
        <Button variant={"default"} asChild className="mt-4">
          <Link to="/">
            <ChevronLeft />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}