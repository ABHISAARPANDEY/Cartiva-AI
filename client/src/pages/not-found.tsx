import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-transparent overflow-visible">
      <Navbar variant="dark" />
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <Card className="w-full max-w-md mx-auto bg-black/80 border-white/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2 items-center">
              <AlertCircle className="h-8 w-8 text-red-400 shrink-0" />
              <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link href="/">
              <Button className="mt-6 w-full sm:w-auto">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
