import { login } from "../../utils/api_auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "../../components/Header";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Login() {
  //set default values 4 state

  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //login handler
  const handleLogin = async (event) => {
    //no hand in the toilet
    event.preventDefault();

    const userInfo = await login(email, password);

    // set cookies
    setCookie("currentUser", userInfo, {
      maxAge: 60 * 60 * 24 * 30, // second * minutes * hours * days
    });

    //show notif upon successful login
    if (userInfo) {
      toast.success("Logged in successfully");
      //back to home
      navigate("/");
      toast.success("Enjoy browsing");
    }
  };
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Header />
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Access more of our features with your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              {/* email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              {/* pwd */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                onClick={handleLogin}
                disabled={!email || !password ? true : false}
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
