import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/api_auth";
import Header from "../../components/Header";
import { useCookies } from "react-cookie";

//UI
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

import { toast } from "sonner";

export default function Signup() {
  //set default values 4 state
  const [cookies, setCookie] = useCookies(["currentUser"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  //Signup Handler
  const handleSignup = async (event) => {
    //no hand in the toilet
    event.preventDefault();

    if (confirmPassword !== password) {
      toast.error("Password does not match");
      navigate("/signup");
    } else {
      const userCreate = await signup(name, email, password);
      console.log(name);
      console.log(email);
      console.log(password);
      console.log(userCreate);

      // set cookies
      setCookie("currentUser", userCreate, {
        maxAge: 60 * 60 * 24 * 30, // second * minutes * hours * days
      });

      //show notif upon successful signup
      if (userCreate) {
        toast.success("Thanks for joining us");
        //back to home
        navigate("/");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Header />
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="text">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                onClick={handleSignup}
                disabled={!name || !email || !password || !confirmPassword}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
