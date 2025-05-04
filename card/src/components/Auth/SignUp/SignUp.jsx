import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useToast } from "../../../hooks/use-toast";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import AuthLayout from "../Authlayout";
import axiosInstance from "@/utils/axiosInstance";

const Signup = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (!password) return { strength: "", color: "" };

    if (password.length < 6) {
      return { strength: "Weak", color: "text-red-500" };
    } else if (password.length < 10) {
      return { strength: "Medium", color: "text-amber-500" };
    } else {
      return { strength: "Strong", color: "text-green-500" };
    }
  };

  const passwordFeedback = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too weak",
        description: "Password should be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    
    
    try {
      setIsLoading(true);
      const response=await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
    finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Sign up to start your learning journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">UserName</Label>
          <Input
            id="username"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring"
            autoComplete="username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring pr-10"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
          {password && (
            <div className="flex items-center mt-1">
              <span className="text-xs mr-1">Strength:</span>
              <span className={`text-xs ${passwordFeedback.color}`}>
                {passwordFeedback.strength}
              </span>
            </div>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Must be at least 6 characters long
          </p>
        </div>

        <Button
          type="submit"
          className="w-full hover:bg-blue-900 hover:text-white"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
          {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;